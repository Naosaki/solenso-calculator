import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Trash2, Edit, X, Upload, FileText } from 'lucide-react';
import type { MicroInverter } from '../types';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPES = ['application/pdf'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

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

export function AdminPanel() {
  const { user } = useAuth();
  const [microInverters, setMicroInverters] = useState<MicroInverter[]>([]);
  const [editingInverter, setEditingInverter] = useState<MicroInverterFormData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [formData, setFormData] = useState<MicroInverterFormData>(emptyFormData);

  useEffect(() => {
    fetchMicroInverters();
  }, []);

  const fetchMicroInverters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'microOnduleursSolenso'));
      const inverters = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MicroInverter));
      setMicroInverters(inverters);
    } catch (error) {
      toast.error('Erreur lors du chargement des micro-onduleurs');
    }
  };

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

      if (editingInverter?.id) {
        await updateDoc(doc(db, 'microOnduleursSolenso', editingInverter.id), inverterData);
        toast.success('Micro-onduleur mis à jour avec succès');
      } else {
        await addDoc(collection(db, 'microOnduleursSolenso'), inverterData);
        toast.success('Micro-onduleur ajouté avec succès');
      }

      setFormData(emptyFormData);
      setEditingInverter(null);
      fetchMicroInverters();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (inverter: MicroInverter) => {
    setEditingInverter({
      ...inverter,
      vmin: inverter.vmin.toString(),
      vmax: inverter.vmax.toString(),
      vmpp_min: inverter.vmpp_min.toString(),
      isc_max: inverter.isc_max.toString(),
    });
    setFormData({
      ...inverter,
      vmin: inverter.vmin.toString(),
      vmax: inverter.vmax.toString(),
      vmpp_min: inverter.vmpp_min.toString(),
      isc_max: inverter.isc_max.toString(),
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const inverter = microInverters.find(inv => inv.id === id);
      if (!inverter) return;

      // Delete image from Storage
      if (inverter.imageUrl) {
        try {
          const imageRef = ref(storage, inverter.imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      // Delete PDF from Storage if it exists
      if (inverter.ficheTechniqueUrl) {
        try {
          const pdfRef = ref(storage, inverter.ficheTechniqueUrl);
          await deleteObject(pdfRef);
        } catch (error) {
          console.error('Error deleting PDF:', error);
        }
      }

      await deleteDoc(doc(db, 'microOnduleursSolenso', id));
      toast.success('Micro-onduleur supprimé avec succès');
      setShowDeleteConfirm(null);
      fetchMicroInverters();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error('Error:', error);
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Administration des Micro-onduleurs Solenso
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">
          {editingInverter ? 'Modifier le' : 'Ajouter un Nouveau'} Micro-onduleur
        </h2>
        
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

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Enregistrement...' : (editingInverter ? 'Mettre à jour' : 'Ajouter le micro-onduleur')}
            </button>
            {editingInverter && (
              <button
                type="button"
                onClick={() => {
                  setEditingInverter(null);
                  setFormData(emptyFormData);
                }}
                className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Micro-onduleurs existants</h2>
        <div className="space-y-6">
          {microInverters.map((inverter) => (
            <div
              key={inverter.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-grow">
                  <div className="flex items-center space-x-4">
                    <img
                      src={inverter.imageUrl}
                      alt={inverter.nom}
                      className="w-24 h-24 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {inverter.nom}
                      </h3>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Tension d'entrée: {inverter.vmin}V - {inverter.vmax}V</p>
                        <p>VMPP minimale: {inverter.vmpp_min}V</p>
                        <p>Courant max (Isc): {inverter.isc_max}A</p>
                        <a
                          href={inverter.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                        >
                          Voir sur solenso.fr
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                  {inverter.ficheTechniqueUrl && (
                    <a
                      href={inverter.ficheTechniqueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Fiche technique
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(inverter)}
                    className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(inverter.id)}
                    className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </button>
                </div>
              </div>

              {showDeleteConfirm === inverter.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Confirmer la suppression
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Êtes-vous sûr de vouloir supprimer le micro-onduleur "{inverter.nom}" ?
                      Cette action est irréversible.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={() => handleDelete(inverter.id)}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}