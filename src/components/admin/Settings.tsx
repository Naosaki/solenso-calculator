import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { Loader2, Upload, Check } from 'lucide-react';

export function Settings() {
  const [logoUrl, setLogoUrl] = useState('');
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newLogoPreviewUrl, setNewLogoPreviewUrl] = useState<string>('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    fetchCurrentLogo();
    return () => {
      if (newLogoPreviewUrl) {
        URL.revokeObjectURL(newLogoPreviewUrl);
      }
    };
  }, []);

  const fetchCurrentLogo = async () => {
    try {
      const configDoc = await getDoc(doc(db, 'configuration', 'logo'));
      if (configDoc.exists()) {
        setLogoUrl(configDoc.data().url);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 2MB');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setNewLogoPreviewUrl(previewUrl);
    setNewLogoFile(file);
  };

  const handleLogoUpload = async () => {
    if (!newLogoFile) return;

    setIsUploadingLogo(true);
    try {
      // Upload to Firebase Storage
      const logoRef = ref(storage, `assets/logo-${Date.now()}.${newLogoFile.name.split('.').pop()}`);
      await uploadBytes(logoRef, newLogoFile);
      const url = await getDownloadURL(logoRef);

      // Save URL to Firestore
      await setDoc(doc(db, 'configuration', 'logo'), { url });

      setLogoUrl(url);
      setNewLogoFile(null);
      setNewLogoPreviewUrl('');
      toast.success('Logo mis à jour avec succès');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Erreur lors de la mise à jour du logo');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const cancelLogoUpdate = () => {
    if (newLogoPreviewUrl) {
      URL.revokeObjectURL(newLogoPreviewUrl);
    }
    setNewLogoFile(null);
    setNewLogoPreviewUrl('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Paramètres de l'application
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Logo de l'application</h2>
        <div className="space-y-4">
          {logoUrl && !newLogoPreviewUrl && (
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Logo actuel :</p>
              <img src={logoUrl} alt="Logo actuel" className="h-12" />
            </div>
          )}
          {newLogoPreviewUrl && (
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Aperçu du nouveau logo :</p>
              <img src={newLogoPreviewUrl} alt="Aperçu du logo" className="h-12 mb-4" />
              <div className="flex space-x-4">
                <button
                  onClick={handleLogoUpload}
                  disabled={isUploadingLogo}
                  className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
                >
                  {isUploadingLogo ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  ) : (
                    <Check className="h-5 w-5 mr-2" />
                  )}
                  Valider ce logo
                </button>
                <button
                  onClick={cancelLogoUpdate}
                  disabled={isUploadingLogo}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Changer le logo
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <Upload className="h-5 w-5 mr-2" />
                Choisir une image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoSelect}
                  disabled={isUploadingLogo}
                />
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Format recommandé : PNG ou SVG. Taille maximale : 2MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}