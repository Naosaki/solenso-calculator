import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, LogOut, Globe, Settings } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../lib/translations';
import { UserSettings } from './UserSettings';

export function Navigation() {
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [logoUrl, setLogoUrl] = useState<string>("https://firebasestorage.googleapis.com/v0/b/solenso-aa3d3.applestorage.app/o/assets%2Flogo-Solenso-2025.png?alt=media&token=992df2e8-1745-40ca-ba87-904a823869eb");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'configuration', 'logo'), (doc) => {
      if (doc.exists()) {
        setLogoUrl(doc.data().url);
      }
    });

    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById('user-menu');
      const userButton = document.getElementById('user-menu-button');
      if (userMenu && userButton && !userMenu.contains(event.target as Node) && !userButton.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src={logoUrl}
              alt="Solenso"
              className="h-8"
            />
          </Link>
          <div className="flex items-center space-x-4">
            {!isAdminPage && (
              <div className="relative">
                <button
                  id="lang-menu-button"
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">{currentLanguage?.name}</span>
                </button>

                {showLangMenu && (
                  <div
                    id="lang-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {user && (
              <div className="relative">
                <button
                  id="user-menu-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                </button>

                {showUserMenu && (
                  <div
                    id="user-menu"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowUserSettings(true);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t('navigation.userMenu.profile')}
                    </button>
                    {!isAdminPage && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t('navigation.userMenu.administration')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('navigation.userMenu.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserSettings && (
        <UserSettings onClose={() => setShowUserSettings(false)} />
      )}
    </nav>
  );
}