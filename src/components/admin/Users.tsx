import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser, getAuth } from 'firebase/auth';
import { db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { UserPlus, Trash2, Globe, X, Loader2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../lib/translations';

interface User {
  id: string;
  email: string;
  createdAt: string;
  language?: string;
}

interface UserFormData {
  email: string;
  password: string;
  confirmPassword: string;
  language: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    language: 'fr'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    }
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error('L\'email est requis');
      return false;
    }

    if (!formData.email.includes('@')) {
      toast.error('Email invalide');
      return false;
    }

    if (!formData.password) {
      toast.error('Le mot de passe est requis');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Save user data including language preference
      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        createdAt: new Date().toISOString(),
        language: formData.language
      });

      // Set initial user preferences
      await setDoc(doc(db, 'userPreferences', user.uid), {
        language: formData.language
      });

      toast.success('Utilisateur créé avec succès');
      setShowForm(false);
      setFormData({ email: '', password: '', confirmPassword: '', language: 'fr' });
      fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Cet email est déjà utilisé');
      } else {
        toast.error('Erreur lors de la création de l\'utilisateur');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      await deleteDoc(doc(db, 'userPreferences', userId));
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && user.uid === userId) {
        await deleteUser(user);
      }
      toast.success('Utilisateur supprimé avec succès');
      setShowDeleteConfirm(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des utilisateurs
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Créer un utilisateur
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.email}
                  </h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-500">
                      Créé le {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {SUPPORTED_LANGUAGES.find(lang => lang.code === user.language)?.name || 'Français'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowDeleteConfirm(user.id)}
                    className="flex items-center px-3 py-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {showDeleteConfirm === user.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Confirmer la suppression
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.email}" ?
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
                        onClick={() => handleDelete(user.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Aucun utilisateur trouvé
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Créer un nouvel utilisateur
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Langue par défaut
                </label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
                      Création...
                    </>
                  ) : (
                    'Créer l\'utilisateur'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}