import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { Trash2, Edit, X, FileText, Plus, Copy } from 'lucide-react';
import type { MicroInverter } from '../../types';
import { MicroInverterForm } from './MicroInverterForm';
import { useLanguage } from '../../hooks/useLanguage';

export function MicroInverters() {
  const { t } = useLanguage();
  const [microInverters, setMicroInverters] = useState<MicroInverter[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInverter, setEditingInverter] = useState<MicroInverter | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

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
    } catch {
      toast.error('Erreur lors du chargement des micro-onduleurs');
    }
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

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingInverter(null);
    fetchMicroInverters();
  };

  const handleDuplicate = (inverter: MicroInverter) => {
    // Cru00e9er une copie avec un ID temporaire pour satisfaire le typage
    const duplicatedInverter = {
      ...inverter,
      nom: `${inverter.nom} (copie)`,
      id: 'temp-id-' + Date.now() // ID temporaire qui sera remplacu00e9 lors de la cru00e9ation
    };
    setEditingInverter(duplicatedInverter);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('admin.microInverters.title')}
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('admin.microInverters.add')}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
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
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {inverter.nom}
                        </h3>
                        <button
                          onClick={() => handleDuplicate(inverter)}
                          className="text-gray-400 hover:text-gray-600"
                          title={t('admin.microInverters.duplicate')}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
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
                          {t('admin.microInverters.viewOnSolenso')}
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
                      {t('admin.microInverters.datasheet')}
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setEditingInverter(inverter);
                      setShowForm(true);
                    }}
                    className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {t('admin.microInverters.edit')}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(inverter.id)}
                    className="flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t('admin.microInverters.delete')}
                  </button>
                </div>
              </div>

              {showDeleteConfirm === inverter.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t('admin.microInverters.confirmDelete')}
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
                        {t('admin.microInverters.cancel')}
                      </button>
                      <button
                        onClick={() => handleDelete(inverter.id)}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                      >
                        {t('admin.microInverters.confirm')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingInverter ? (editingInverter.id ? t('admin.microInverters.edit') : t('admin.microInverters.duplicate')) : t('admin.microInverters.add')}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingInverter(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <MicroInverterForm
              inverter={editingInverter}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingInverter(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}