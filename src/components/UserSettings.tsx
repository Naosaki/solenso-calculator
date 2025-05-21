import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { toast } from 'react-hot-toast';
import { updatePassword, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Loader2, Globe, Check } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SUPPORTED_LANGUAGES } from '../lib/translations';

interface UserPreferences {
  language: string;
}

export function UserSettings({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const { language: currentLanguage, setLanguage, t } = useLanguage();
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);

  useEffect(() => {
    fetchUserPreferences();
  }, [user]);

  const fetchUserPreferences = async () => {
    if (!user) return;
    try {
      const prefsDoc = await getDoc(doc(db, 'userPreferences', user.uid));
      if (prefsDoc.exists()) {
        const prefs = prefsDoc.data() as UserPreferences;
        setSelectedLanguage(prefs.language || currentLanguage);
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageChanged(true);
  };

  const handleLanguageConfirm = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'userPreferences', user.uid), {
        language: selectedLanguage
      }, { merge: true });
      setLanguage(selectedLanguage as any);
      setIsLanguageChanged(false);
      toast.success(t('admin.profile.languageUpdated'));
    } catch (error) {
      console.error('Error updating language:', error);
      toast.error(t('admin.profile.languageUpdateError'));
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!currentPassword) {
      toast.error(t('admin.profile.currentPasswordRequired'));
      return;
    }

    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
      toast.success(t('admin.profile.emailUpdated'));
      setNewEmail('');
      setCurrentPassword('');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast.error(t('admin.profile.incorrectPassword'));
      } else {
        toast.error(t('admin.profile.emailUpdateError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!currentPassword) {
      toast.error(t('admin.profile.currentPasswordRequired'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('admin.profile.passwordMismatch'));
      return;
    }

    if (newPassword.length < 6) {
      toast.error(t('admin.profile.passwordTooShort'));
      return;
    }

    setIsLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success(t('admin.profile.passwordUpdated'));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        toast.error(t('admin.profile.incorrectPassword'));
      } else {
        toast.error(t('admin.profile.passwordUpdateError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('admin.profile.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium mb-4">{t('admin.profile.interfaceLanguage')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageSelect(e.target.value)}
                  className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              {isLanguageChanged && (
                <button
                  onClick={handleLanguageConfirm}
                  className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
                >
                  <Check className="h-4 w-4 mr-2" />
                  {t('admin.profile.validateLanguage')}
                </button>
              )}
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium mb-4">{t('admin.profile.updateEmail')}</h3>
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.profile.newEmail')}
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.profile.currentPassword')}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:bg-gray-400 flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : null}
                {t('admin.profile.updateEmailButton')}
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">{t('admin.profile.updatePassword')}</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.profile.currentPassword')}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.profile.newPassword')}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.profile.confirmNewPassword')}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:bg-gray-400 flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : null}
                {t('admin.profile.updatePasswordButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}