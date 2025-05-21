import React, { createContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../lib/translations/constants';
import type { TranslationSchema, LanguageCode } from '../lib/translations/types';
import { fr } from '../lib/translations/fr';
import { en } from '../lib/translations/en';
import { de } from '../lib/translations/de';
import { es } from '../lib/translations/es';
import { zh } from '../lib/translations/zh';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Utiliser la langue par défaut définie dans les variables d'environnement, avec 'fr' comme fallback
  const defaultLanguage = (import.meta.env.VITE_DEFAULT_LANGUAGE as LanguageCode) || 'fr';
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as LanguageCode;
    if (savedLang && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Importer directement les traductions pour éviter les problèmes de mise en cache
  const translations: Record<LanguageCode, TranslationSchema> = {
    fr,
    en,
    de,
    es,
    zh
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    
    // Fonction utilitaire pour accéder en toute sécurité aux propriétés imbriquées
    const getNestedValue = (obj: unknown, path: string[]): { value: unknown; path: string } => {
      let current = obj as Record<string, unknown>;
      let currentPath = '';
      
      for (const segment of path) {
        currentPath = currentPath ? `${currentPath}.${segment}` : segment;
        if (current === undefined || current === null || typeof current !== 'object') {
          return { value: undefined, path: currentPath };
        }
        current = current[segment] as Record<string, unknown>;
      }
      
      return { value: current, path: currentPath };
    };
    
    // Essayer d'abord dans la langue courante
    const result = getNestedValue(translations[language], keys);
    if (result.value !== undefined && typeof result.value === 'string') {
      return result.value;
    }
    
    // Si non trouvé, essayer en anglais comme langue de secours
    if (language !== 'en') {
      const fallbackResult = getNestedValue(translations['en'], keys);
      if (fallbackResult.value !== undefined && typeof fallbackResult.value === 'string') {
        console.log(`Utilisation de la traduction anglaise pour: ${key}`);
        return fallbackResult.value;
      }
    }
    
    // Journaliser l'erreur et retourner la clé
    console.warn(`Traduction non trouvée pour la clé: ${key} dans la langue: ${language}. Chemin interrompu à: ${result.path}`);
    console.log('Structure de traduction disponible:', JSON.stringify(translations[language], null, 2));
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook du00e9placu00e9 dans un fichier su00e9paru00e9 hooks/useLanguage.ts
// Ce commentaire est laissu00e9 pour ru00e9fu00e9rence