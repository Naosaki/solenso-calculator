import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import type { MicroInverter } from '../../types';

interface MicroInverterFormData {
  id?: string;
  nom: string;
  vmin: string;
  vmax: string;
  vmpp_min: string;
  isc_max: string;
  productUrl: string;
  imageFile?: File | null;
  imageUrl: string;
  pdfFile?: File | null;
  ficheTechniqueUrl: string;
}

interface Props {
  inverter: MicroInverter | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPES = ['application/pdf'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

export function MicroInverterForm({ inverter, onSubmit, onCancel }: Props) {
  const emptyFormData: MicroInverterFormData = {
    nom: '',
    vmin: '',
    vmax: '',
    vmpp_min: '',
    isc_max: '',
    productUrl: '',
    imageUrl: '',
    ficheTechniqueUrl: '',
  };

  const [formData, setFormData] = useState<MicroInverterFormData>(
    inverter
      ? {
          ...inverter,
          vmin: inverter.vmin.toString(),
          vmax: inverter.vmax.toString(),
          vmpp_min: inverter.vmpp_min.toString(),
          isc_max: inverter.isc_max.toString(),
        }
      : emptyFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: MicroInverterFormData): boolean => {
    if (!data.nom.trim()) {
      toast.error('Le nom est requis');
      return false;
    }

    const numericFields = {
      'Tension minimale': Number(data.vmin),
      'Tension maximale': Number(data.vmax),
      'VMPP minimale': Number(data.vmpp_min),
      'Courant maximal': Number(data.isc_max),
    };

    for (const [field, value] of Object.entries(numericFields)) {
      if (isNaN(value) || value <= 0) {
        toast.error(`${field} doit être un nombre positif`);
        return false;
      }
    }

    if (Number(data.vmin) >= Number(data.vmax)) {
      toast.error('La tension minimale doit être inférieure à la tension maximale');
      return false;
    }

    if (!data.imageFile && !data.imageUrl) {
      toast.error('Une image est requise');
      return false;
    }

    if (!data.productUrl.trim()) {
      toast.error('L\'URL du produit est requise');
      return false;
    }

    try {
      new URL(data.productUrl);
    } catch {
      toast.error('L\'URL du produit n\'est pas valide');
      return false;
    }

    return true;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'pdf'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = type === 'image' ? ALLOWED_IMAGE_TYPES : ALLOWED_PDF_TYPES;
    const maxSize = type === 'image' ? MAX_IMAGE_SIZE : MAX_PDF_SIZE;

    if (!allowedTypes.includes(file.type)) {
      toast.error(`Format de fichier non supporté. Utilisez ${type === 'image' ? 'JPG, PNG ou WebP' : 'PDF'}`);
      return;
    }

    if (file.size > maxSize) {
      toast.error(`Fichier trop volumineux. Maximum ${maxSize / 1024 / 1024}MB`);
      return;
    }

    if (type === 'image') {
      setFormData(prev => ({ ...prev, imageFile: file }));
    } else {
      setFormData(prev => ({ ...prev, pdfFile: file }));
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    
    setIsSubmitting(true);
    try {
      let imageUrl = formData.imageUrl;
      let ficheTechniqueUrl = formData.ficheTechniqueUrl;

      if (formData.imageFile) {
        const timestamp = Date.now();
        imageUrl = await uploadFile(
          formData.imageFile,
          `images/${formData.nom.replace(/\s+/g, '-')}-${timestamp}.${formData.imageFile.name.split('.').pop()}`
        );
      }

      if (formData.pdfFile) {
        const timestamp = Date.now();
        ficheTechniqueUrl = await uploadFile(
          formData.pdfFile,
          `pdfs/${formData.nom.replace(/\s+/g, '-')}-${timestamp}.pdf`
        );
      }

      const inverterData = {
        nom: formData.nom,
        vmin: Number(formData.vmin),
        vmax: Number(formData.vmax),
        vmpp_min: Number(formData.vmpp_min),
        isc_max: Number(formData.isc_max),
        productUrl: formData.productUrl,
        imageUrl,
        ficheTechniqueUrl: ficheTechniqueUrl || null
      };

      if (inverter?.id) {
        await updateDoc(doc(db, 'microOnduleursSolenso', inverter.id), inverterData);
        toast.success('Micro-onduleur mis à jour avec succès');
      } else {
        await addDoc(collection(db, 'microOnduleursSolenso'), inverterData);
        toast.success('Micro-onduleur ajouté avec succès');
      }

      onSubmit();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Nom du modèle - Full width */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom du modèle
          </label>
          <input
            type="text"
            value={formData.nom}
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="Ex: Solenso SG 500"
          />
        </div>

        {/* Tensions sur la même ligne */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tension minimale (Vmin)
            </label>
            <input
              type="number"
              value={formData.vmin}
              onChange={(e) => setFormData({...formData, vmin: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tension maximale (Vmax)
            </label>
            <input
              type="number"
              value={formData.vmax}
              onChange={(e) => setFormData({...formData, vmax: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              step="0.1"
            />
          </div>
        </div>

        {/* VMPP et Courant sur la même ligne */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tension VMPP minimale
            </label>
            <input
              type="number"
              value={formData.vmpp_min}
              onChange={(e) => setFormData({...formData, vmpp_min: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Courant max (Isc)
            </label>
            <input
              type="number"
              value={formData.isc_max}
              onChange={(e) => setFormData({...formData, isc_max: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              step="0.1"
            />
          </div>
        </div>

        {/* URL du produit - Full width */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL du produit
          </label>
          <input
            type="url"
            value={formData.productUrl}
            onChange={(e) => setFormData({...formData, productUrl: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
            placeholder="https://solenso.fr/produits/sg-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image du produit
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Choisir une image
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => handleFileChange(e, 'image')}
                />
              </label>
              {(formData.imageFile || formData.imageUrl) && (
                <div className="relative">
                  <img
                    src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.imageUrl}
                    alt="Prévisualisation"
                    className="h-20 w-20 object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, imageFile: null, imageUrl: ''})}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              JPG, PNG ou WebP. Max 5MB.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fiche technique (PDF)
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <FileText className="h-5 w-5 mr-2" />
                Choisir un PDF
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, 'pdf')}
                />
              </label>
              {(formData.pdfFile || formData.ficheTechniqueUrl) && (
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {formData.pdfFile?.name || 'Fiche technique'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, pdfFile: null, ficheTechniqueUrl: ''})}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              PDF uniquement. Max 10MB.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Enregistrement...
            </>
          ) : (
            inverter ? 'Mettre à jour' : 'Créer'
          )}
        </button>
      </div>
    </form>
  );
}