export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'zh', name: '中文' }
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export const translations: Record<LanguageCode, {
  calculator: {
    title: string;
    subtitle: string;
    example: {
      title: string;
      description: string;
      voltages: string;
      currents: string;
      coefficients: string;
      useValues: string;
    };
    fields: {
      title: string;
      voc: string;
      vmpp: string;
      isc: string;
      impp: string;
      coef_voc: string;
      coef_isc: string;
    };
    calculate: string;
    calculating: string;
    results: {
      compatible: string;
      incompatible: string;
      noResults: {
        title: string;
        description: string;
        contact: string;
      };
      backToForm: string;
      downloadPdf: string;
      reasons: string;
      technicalSheet: string;
      viewProduct: string;
      calculatedValues: {
        title: string;
        vmax: string;
        vmin: string;
        vmpp_min: string;
        isc_max: string;
      };
    };
  };
  admin: {
    navigation: {
      title: string;
      subtitle: string;
      'micro-inverters': string;
      'calculation-engine': string;
      forms: string;
      users: string;
      settings: string;
      descriptions: {
        'micro-inverters': string;
        'calculation-engine': string;
        forms: string;
        users: string;
        settings: string;
      };
    };
    profile: {
      title: string;
      interfaceLanguage: string;
      validateLanguage: string;
      languageUpdated: string;
      languageUpdateError: string;
      updateEmail: string;
      newEmail: string;
      currentPassword: string;
      updateEmailButton: string;
      emailUpdated: string;
      emailUpdateError: string;
      updatePassword: string;
      newPassword: string;
      confirmNewPassword: string;
      updatePasswordButton: string;
      passwordUpdated: string;
      passwordUpdateError: string;
      currentPasswordRequired: string;
      incorrectPassword: string;
      passwordMismatch: string;
      passwordTooShort: string;
    };
    microInverters: {
      title: string;
      add: string;
      name: string;
      voltageRange: string;
      vmppMin: string;
      iscMax: string;
      productUrl: string;
      image: string;
      datasheet: string;
      edit: string;
      delete: string;
      confirmDelete: string;
      cancel: string;
      confirm: string;
      duplicate: string;
      viewOnSolenso: string;
    };
    calculationEngine: {
      title: string;
      formulas: string;
      vmax: string;
      vmin: string;
      vmppMin: string;
      iscMax: string;
    };
    forms: {
      title: string;
      fields: string;
      voltages: string;
      currents: string;
      coefficients: string;
      temperatures: string;
    };
    users: {
      title: string;
      addUser: string;
      email: string;
      password: string;
      confirmPassword: string;
      defaultLanguage: string;
      createUser: string;
      createdAt: string;
      actions: string;
      deleteConfirm: string;
      deleteUser: string;
      userDeleted: string;
      userDeleteError: string;
    };
    settings: {
      title: string;
      logo: {
        title: string;
        current: string;
        preview: string;
        change: string;
        validate: string;
        cancel: string;
        format: string;
      };
    };
  };
  auth: {
    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      submit: string;
      invalidCredentials: string;
    };
  };
}> = {
  fr: {
    calculator: {
      title: 'Quel micro-onduleur Solenso est compatible avec votre panneau ?',
      subtitle: 'Entrez les caractéristiques de votre panneau solaire pour découvrir les micro-onduleurs Solenso adaptés à votre installation.',
      example: {
        title: 'Valeurs d\'exemple',
        description: 'Voici des valeurs typiques pour un panneau solaire de 450Wc :',
        voltages: 'Tensions',
        currents: 'Courants',
        coefficients: 'Coefficients de température',
        useValues: 'Utiliser ces valeurs'
      },
      fields: {
        title: 'Caractéristiques de votre panneau solaire',
        voc: 'Tension en circuit ouvert (Voc)',
        vmpp: 'Tension de fonctionnement optimal (Vmpp)',
        isc: 'Courant de court-circuit (Isc)',
        impp: 'Courant de fonctionnement optimal (Impp)',
        coef_voc: 'Coefficient de température Voc',
        coef_isc: 'Coefficient de température Isc'
      },
      calculate: 'Trouver les micro-onduleurs compatibles',
      calculating: 'Recherche en cours...',
      results: {
        compatible: 'Micro-onduleurs Compatibles',
        incompatible: 'Micro-onduleurs Non Compatibles',
        noResults: {
          title: 'Aucun micro-onduleur compatible trouvé',
          description: 'Les caractéristiques de votre panneau ne correspondent pas aux plages de fonctionnement de nos micro-onduleurs actuels.',
          contact: 'Contacter un conseiller Solenso'
        },
        backToForm: 'Retour au formulaire',
        downloadPdf: 'Télécharger en PDF',
        reasons: 'Raisons d\'incompatibilité :',
        technicalSheet: 'Fiche technique',
        viewProduct: 'Voir sur solenso.fr',
        calculatedValues: {
          title: 'Valeurs calculées pour votre panneau',
          vmax: 'Tension maximale (à -10°C)',
          vmin: 'Tension minimale (à 70°C)',
          vmpp_min: 'VMPP minimale (à 70°C)',
          isc_max: 'Courant maximal (à 70°C)'
        }
      }
    },
    admin: {
      navigation: {
        title: 'Administration',
        subtitle: 'Gérez votre application',
        'micro-inverters': 'Micro-onduleurs',
        'calculation-engine': 'Moteur de calcul',
        forms: 'Formulaires',
        users: 'Utilisateurs',
        settings: 'Paramètres',
        descriptions: {
          'micro-inverters': 'Gérer le catalogue des micro-onduleurs',
          'calculation-engine': 'Configurer les formules de calcul',
          forms: 'Gérer les formulaires de saisie',
          users: 'Gérer les comptes utilisateurs',
          settings: 'Configurer les paramètres du compte'
        }
      },
      profile: {
        title: 'Mon profil',
        interfaceLanguage: 'Langue de l\'interface',
        validateLanguage: 'Valider la langue',
        languageUpdated: 'Langue mise à jour avec succès',
        languageUpdateError: 'Erreur lors de la mise à jour de la langue',
        updateEmail: 'Modifier l\'email',
        newEmail: 'Nouvel email',
        currentPassword: 'Mot de passe actuel',
        updateEmailButton: 'Mettre à jour l\'email',
        emailUpdated: 'Email mis à jour avec succès',
        emailUpdateError: 'Erreur lors de la mise à jour de l\'email',
        updatePassword: 'Modifier le mot de passe',
        newPassword: 'Nouveau mot de passe',
        confirmNewPassword: 'Confirmer le nouveau mot de passe',
        updatePasswordButton: 'Mettre à jour le mot de passe',
        passwordUpdated: 'Mot de passe mis à jour avec succès',
        passwordUpdateError: 'Erreur lors de la mise à jour du mot de passe',
        currentPasswordRequired: 'Veuillez saisir votre mot de passe actuel',
        incorrectPassword: 'Mot de passe incorrect',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères'
      },
      microInverters: {
        title: 'Micro-onduleurs',
        add: 'Créer un micro-onduleur',
        name: 'Nom du modèle',
        voltageRange: 'Plage de tension',
        vmppMin: 'VMPP minimale',
        iscMax: 'Courant max (Isc)',
        productUrl: 'URL du produit',
        image: 'Image du produit',
        datasheet: 'Fiche technique',
        edit: 'Modifier',
        delete: 'Supprimer',
        confirmDelete: 'Confirmer la suppression',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        duplicate: 'Dupliquer',
        viewOnSolenso: 'Voir sur solenso.fr'
      },
      calculationEngine: {
        title: 'Moteur de calcul',
        formulas: 'Formules de calcul',
        vmax: 'Tension maximale (Vmax)',
        vmin: 'Tension minimale (Vmin)',
        vmppMin: 'Tension Vmpp minimale',
        iscMax: 'Courant maximal (Isc_max)'
      },
      forms: {
        title: 'Gestion des formulaires',
        fields: 'Champs du formulaire',
        voltages: 'Tensions',
        currents: 'Courants',
        coefficients: 'Coefficients',
        temperatures: 'Températures'
      },
      users: {
        title: 'Gestion des utilisateurs',
        addUser: 'Créer un utilisateur',
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        defaultLanguage: 'Langue par défaut',
        createUser: 'Créer l\'utilisateur',
        createdAt: 'Créé le',
        actions: 'Actions',
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
        deleteUser: 'Supprimer l\'utilisateur',
        userDeleted: 'Utilisateur supprimé avec succès',
        userDeleteError: 'Erreur lors de la suppression de l\'utilisateur'
      },
      settings: {
        title: 'Paramètres de l\'application',
        logo: {
          title: 'Logo de l\'application',
          current: 'Logo actuel',
          preview: 'Aperçu du nouveau logo',
          change: 'Changer le logo',
          validate: 'Valider ce logo',
          cancel: 'Annuler',
          format: 'Format recommandé : PNG ou SVG. Taille maximale : 2MB'
        }
      }
    },
    auth: {
      login: {
        title: 'Accès Administration',
        subtitle: 'Connectez-vous pour gérer les micro-onduleurs',
        email: 'Adresse email',
        password: 'Mot de passe',
        submit: 'Se connecter',
        invalidCredentials: 'Identifiants invalides'
      }
    }
  },
  en: {
    calculator: {
      title: 'Which Solenso micro-inverter is compatible with your panel?',
      subtitle: 'Enter your solar panel specifications to find suitable Solenso micro-inverters for your installation.',
      example: {
        title: 'Example Values',
        description: 'Here are typical values for a 450Wp solar panel:',
        voltages: 'Voltages',
        currents: 'Currents',
        coefficients: 'Temperature Coefficients',
        useValues: 'Use these values'
      },
      fields: {
        title: 'Your Solar Panel Specifications',
        voc: 'Open Circuit Voltage (Voc)',
        vmpp: 'Maximum Power Point Voltage (Vmpp)',
        isc: 'Short Circuit Current (Isc)',
        impp: 'Maximum Power Point Current (Impp)',
        coef_voc: 'Voc Temperature Coefficient',
        coef_isc: 'Isc Temperature Coefficient'
      },
      calculate: 'Find Compatible Micro-inverters',
      calculating: 'Searching...',
      results: {
        compatible: 'Compatible Micro-inverters',
        incompatible: 'Incompatible Micro-inverters',
        noResults: {
          title: 'No Compatible Micro-inverter Found',
          description: 'Your panel specifications do not match the operating ranges of our current micro-inverters.',
          contact: 'Contact a Solenso Advisor'
        },
        backToForm: 'Back to Form',
        downloadPdf: 'Download PDF',
        reasons: 'Incompatibility Reasons:',
        technicalSheet: 'Technical Sheet',
        viewProduct: 'View on solenso.fr',
        calculatedValues: {
          title: 'Calculated Values for Your Panel',
          vmax: 'Maximum Voltage (at -10°C)',
          vmin: 'Minimum Voltage (at 70°C)',
          vmpp_min: 'Minimum VMPP (at 70°C)',
          isc_max: 'Maximum Current (at 70°C)'
        }
      }
    },
    admin: {
      navigation: {
        title: 'Administration',
        subtitle: 'Manage your application',
        'micro-inverters': 'Micro-inverters',
        'calculation-engine': 'Calculation Engine',
        forms: 'Forms',
        users: 'Users',
        settings: 'Settings',
        descriptions: {
          'micro-inverters': 'Manage micro-inverter catalog',
          'calculation-engine': 'Configure calculation formulas',
          forms: 'Manage input forms',
          users: 'Manage user accounts',
          settings: 'Configure account settings'
        }
      },
      profile: {
        title: 'My Profile',
        interfaceLanguage: 'Interface Language',
        validateLanguage: 'Validate Language',
        languageUpdated: 'Language updated successfully',
        languageUpdateError: 'Error updating language',
        updateEmail: 'Update Email',
        newEmail: 'New Email',
        currentPassword: 'Current Password',
        updateEmailButton: 'Update Email',
        emailUpdated: 'Email updated successfully',
        emailUpdateError: 'Error updating email',
        updatePassword: 'Update Password',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        updatePasswordButton: 'Update Password',
        passwordUpdated: 'Password updated successfully',
        passwordUpdateError: 'Error updating password',
        currentPasswordRequired: 'Please enter your current password',
        incorrectPassword: 'Incorrect password',
        passwordMismatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 6 characters long'
      },
      microInverters: {
        title: 'Micro-inverters',
        add: 'Create Micro-inverter',
        name: 'Model Name',
        voltageRange: 'Voltage Range',
        vmppMin: 'Minimum VMPP',
        iscMax: 'Maximum Current (Isc)',
        productUrl: 'Product URL',
        image: 'Product Image',
        datasheet: 'Technical Datasheet',
        edit: 'Edit',
        delete: 'Delete',
        confirmDelete: 'Confirm Deletion',
        cancel: 'Cancel',
        confirm: 'Confirm',
        duplicate: 'Duplicate',
        viewOnSolenso: 'View on solenso.fr'
      },
      calculationEngine: {
        title: 'Calculation Engine',
        formulas: 'Calculation Formulas',
        vmax: 'Maximum Voltage (Vmax)',
        vmin: 'Minimum Voltage (Vmin)',
        vmppMin: 'Minimum Vmpp Voltage',
        iscMax: 'Maximum Current (Isc_max)'
      },
      forms: {
        title: 'Form Management',
        fields: 'Form Fields',
        voltages: 'Voltages',
        currents: 'Currents',
        coefficients: 'Coefficients',
        temperatures: 'Temperatures'
      },
      users: {
        title: 'User Management',
        addUser: 'Create User',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        defaultLanguage: 'Default Language',
        createUser: 'Create User',
        createdAt: 'Created on',
        actions: 'Actions',
        deleteConfirm: 'Are you sure you want to delete this user?',
        deleteUser: 'Delete User',
        userDeleted: 'User deleted successfully',
        userDeleteError: 'Error deleting user'
      },
      settings: {
        title: 'Application Settings',
        logo: {
          title: 'Application Logo',
          current: 'Current Logo',
          preview: 'New Logo Preview',
          change: 'Change Logo',
          validate: 'Validate Logo',
          cancel: 'Cancel',
          format: 'Recommended format: PNG or SVG. Maximum size: 2MB'
        }
      }
    },
    auth: {
      login: {
        title: 'Administration Access',
        subtitle: 'Log in to manage micro-inverters',
        email: 'Email address',
        password: 'Password',
        submit: 'Log in',
        invalidCredentials: 'Invalid credentials'
      }
    }
  },
  de: {
    calculator: {
      title: 'Welcher Solenso-Mikrowechselrichter ist mit Ihrem Modul kompatibel?',
      subtitle: 'Geben Sie die Spezifikationen Ihres Solarmoduls ein, um passende Solenso-Mikrowechselrichter für Ihre Installation zu finden.',
      example: {
        title: 'Beispielwerte',
        description: 'Hier sind typische Werte für ein 450Wp-Solarmodul:',
        voltages: 'Spannungen',
        currents: 'Ströme',
        coefficients: 'Temperaturkoeffizienten',
        useValues: 'Diese Werte verwenden'
      },
      fields: {
        title: 'Spezifikationen Ihres Solarmoduls',
        voc: 'Leerlaufspannung (Voc)',
        vmpp: 'MPP-Spannung (Vmpp)',
        isc: 'Kurzschlussstrom (Isc)',
        impp: 'MPP-Strom (Impp)',
        coef_voc: 'Voc-Temperaturkoeffizient',
        coef_isc: 'Isc-Temperaturkoeffizient'
      },
      calculate: 'Kompatible Mikrowechselrichter finden',
      calculating: 'Suche läuft...',
      results: {
        compatible: 'Kompatible Mikrowechselrichter',
        incompatible: 'Nicht kompatible Mikrowechselrichter',
        noResults: {
          title: 'Kein kompatibler Mikrowechselrichter gefunden',
          description: 'Die Spezifikationen Ihres Moduls entsprechen nicht den Betriebsbereichen unserer aktuellen Mikrowechselrichter.',
          contact: 'Solenso-Berater kontaktieren'
        },
        backToForm: 'Zurück zum Formular',
        downloadPdf: 'PDF herunterladen',
        reasons: 'Gründe für Inkompatibilität:',
        technicalSheet: 'Technisches Datenblatt',
        viewProduct: 'Auf solenso.fr ansehen',
        calculatedValues: {
          title: 'Berechnete Werte für Ihr Modul',
          vmax: 'Maximale Spannung (bei -10°C)',
          vmin: 'Minimale Spannung (bei 70°C)',
          vmpp_min: 'Minimale VMPP (bei 70°C)',
          isc_max: 'Maximaler Strom (bei 70°C)'
        }
      }
    },
    admin: {
      navigation: {
        title: 'Administration',
        subtitle: 'Verwalten Sie Ihre Anwendung',
        'micro-inverters': 'Mikrowechselrichter',
        'calculation-engine': 'Berechnungsmotor',
        forms: 'Formulare',
        users: 'Benutzer',
        settings: 'Einstellungen',
        descriptions: {
          'micro-inverters': 'Mikrowechselrichter-Katalog verwalten',
          'calculation-engine': 'Berechnungsformeln konfigurieren',
          forms: 'Eingabeformulare verwalten',
          users: 'Benutzerkonten verwalten',
          settings: 'Kontoeinstellungen konfigurieren'
        }
      },
      profile: {
        title: 'Mein Profil',
        interfaceLanguage: 'Oberflächensprache',
        validateLanguage: 'Sprache bestätigen',
        languageUpdated: 'Sprache erfolgreich aktualisiert',
        languageUpdateError: 'Fehler beim Aktualisieren der Sprache',
        updateEmail: 'E-Mail aktualisieren',
        newEmail: 'Neue E-Mail',
        currentPassword: 'Aktuelles Passwort',
        updateEmailButton: 'E-Mail aktualisieren',
        emailUpdated: 'E-Mail erfolgreich aktualisiert',
        emailUpdateError: 'Fehler beim Aktualisieren der E-Mail',
        updatePassword: 'Passwort ändern',
        newPassword: 'Neues Passwort',
        confirmNewPassword: 'Neues Passwort bestätigen',
        updatePasswordButton: 'Passwort aktualisieren',
        passwordUpdated: 'Passwort erfolgreich aktualisiert',
        passwordUpdateError: 'Fehler beim Aktualisieren des Passworts',
        currentPasswordRequired: 'Bitte geben Sie Ihr aktuelles Passwort ein',
        incorrectPassword: 'Falsches Passwort',
        passwordMismatch: 'Passwörter stimmen nicht überein',
        passwordTooShort: 'Das Passwort muss mindestens 6 Zeichen lang sein'
      },
      microInverters: {
        title: 'Mikrowechselrichter',
        add: 'Mikrowechselrichter erstellen',
        name: 'Modellname',
        voltageRange: 'Spannungsbereich',
        vmppMin: 'Minimale VMPP',
        iscMax: 'Maximaler Strom (Isc)',
        productUrl: 'Produkt-URL',
        image: 'Produktbild',
        datasheet: 'Technisches Datenblatt',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        confirmDelete: 'Löschen bestätigen',
        cancel: 'Abbrechen',
        confirm: 'Bestätigen',
        duplicate: 'Duplizieren',
        viewOnSolenso: 'Auf solenso.fr ansehen'
      },
      calculationEngine: {
        title: 'Berechnungsmotor',
        formulas: 'Berechnungsformeln',
        vmax: 'Maximale Spannung (Vmax)',
        vmin: 'Minimale Spannung (Vmin)',
        vmppMin: 'Minimale Vmpp-Spannung',
        iscMax: 'Maximaler Strom (Isc_max)'
      },
      forms: {
        title: 'Formularverwaltung',
        fields: 'Formularfelder',
        voltages: 'Spannungen',
        currents: 'Ströme',
        coefficients: 'Koeffizienten',
        temperatures: 'Temperaturen'
      },
      users: {
        title: 'Benutzerverwaltung',
        addUser: 'Benutzer erstellen',
        email: 'E-Mail',
        password: 'Passwort',
        confirmPassword: 'Passwort bestätigen',
        defaultLanguage: 'Standardsprache',
        createUser: 'Benutzer erstellen',
        createdAt: 'Erstellt am',
        actions: 'Aktionen',
        deleteConfirm: 'Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?',
        deleteUser: 'Benutzer löschen',
        userDeleted: 'Benutzer erfolgreich gelöscht',
        userDeleteError: 'Fehler beim Löschen des Benutzers'
      },
      settings: {
        title: 'Anwendungseinstellungen',
        logo: {
          title: 'Anwendungslogo',
          current: 'Aktuelles Logo',
          preview: 'Vorschau neues Logo',
          change: 'Logo ändern',
          validate: 'Logo bestätigen',
          cancel: 'Abbrechen',
          format: 'Empfohlenes Format: PNG oder SVG. Maximale Größe: 2MB'
        }
      }
    },
    auth: {
      login: {
        title: 'Administratorzugang',
        subtitle: 'Melden Sie sich an, um Mikrowechselrichter zu verwalten',
        email: 'E-Mail-Adresse',
        password: 'Passwort',
        submit: 'Anmelden',
        invalidCredentials: 'Ungültige Anmeldedaten'
      }
    }
  },
  es: {
    calculator: {
      title: '¿Qué microinversor Solenso es compatible con su panel?',
      subtitle: 'Ingrese las especificaciones de su panel solar para encontrar los microinversores Solenso adecuados para su instalación.',
      example: {
        title: 'Valores de ejemplo',
        description: 'Aquí hay valores típicos para un panel solar de 450Wp:',
        voltages: 'Voltajes',
        currents: 'Corrientes',
        coefficients: 'Coeficientes de temperatura',
        useValues: 'Usar estos valores'
      },
      fields: {
        title: 'Especificaciones de su panel solar',
        voc: 'Voltaje de circuito abierto (Voc)',
        vmpp: 'Voltaje de punto de máxima potencia (Vmpp)',
        isc: 'Corriente de cortocircuito (Isc)',
        impp: 'Corriente de punto de máxima potencia (Impp)',
        coef_voc: 'Coeficiente de temperatura Voc',
        coef_isc: 'Coeficiente de temperatura Isc'
      },
      calculate: 'Encontrar microinversores compatibles',
      calculating: 'Buscando...',
      results: {
        compatible: 'Microinversores compatibles',
        incompatible: 'Microinversores no compatibles',
        noResults: {
          title: 'No se encontró ningún microinversor compatible',
          description: 'Las especificaciones de su panel no coinciden con los rangos de operación de nuestros microinversores actuales.',
          contact: 'Contactar a un asesor Solenso'
        },
        backToForm: 'Volver al formulario',
        downloadPdf: 'Descargar PDF',
        reasons: 'Razones de incompatibilidad:',
        technicalSheet: 'Ficha técnica',
        viewProduct: 'Ver en solenso.fr',
        calculatedValues: {
          title: 'Valores calculados para su panel',
          vmax: 'Voltaje máximo (a -10°C)',
          vmin: 'Voltaje mínimo (a 70°C)',
          vmpp_min: 'VMPP mínimo (a 70°C)',
          isc_max: 'Corriente máxima (a 70°C)'
        }
      }
    },
    admin: {
      navigation: {
        title: 'Administración',
        subtitle: 'Gestione su aplicación',
        'micro-inverters': 'Microinversores',
        'calculation-engine': 'Motor de cálculo',
        forms: 'Formularios',
        users: 'Usuarios',
        settings: 'Ajustes',
        descriptions: {
          'micro-inverters': 'Gestionar catálogo de microinversores',
          'calculation-engine': 'Configurar fórmulas de cálculo',
          forms: 'Gestionar formularios de entrada',
          users: 'Gestionar cuentas de usuario',
          settings: 'Configurar ajustes de cuenta'
        }
      },
      profile: {
        title: 'Mi Perfil',
        interfaceLanguage: 'Idioma de la interfaz',
        validateLanguage: 'Validar idioma',
        languageUpdated: 'Idioma actualizado correctamente',
        languageUpdateError: 'Error al actualizar el idioma',
        updateEmail: 'Actualizar correo electrónico',
        newEmail: 'Nuevo correo electrónico',
        currentPassword: 'Contraseña actual',
        updateEmailButton: 'Actualizar correo electrónico',
        emailUpdated: 'Correo electrónico actualizado correctamente',
        emailUpdateError: 'Error al actualizar el correo electrónico',
        updatePassword: 'Actualizar contraseña',
        newPassword: 'Nueva contraseña',
        confirmNewPassword: 'Confirmar nueva contrase',
        updatePasswordButton: 'Actualizar contraseña',
        passwordUpdated: 'Contraseña actualizada correctamente',
        passwordUpdateError: 'Error al actualizar la contraseña',
        currentPasswordRequired: 'Por favor, ingrese su contraseña actual',
        incorrectPassword: 'Contraseña incorrecta',
        passwordMismatch: 'Las contraseñas no coinciden',
        passwordTooShort: 'La contraseña debe tener al menos 6 caracteres'
      },
      microInverters: {
        title: 'Microinversores',
        add: 'Crear microinversor',
        name: 'Nombre del modelo',
        voltageRange: 'Rango de voltaje',
        vmppMin: 'VMPP mínimo',
        iscMax: 'Corriente máxima (Isc)',
        productUrl: 'URL del producto',
        image: 'Imagen del producto',
        datasheet: 'Ficha técnica',
        edit: 'Editar',
        delete: 'Eliminar',
        confirmDelete: 'Confirmar eliminación',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        duplicate: 'Duplicar',
        viewOnSolenso: 'Ver en solenso.fr'
      },
      calculationEngine: {
        title: 'Motor de cálculo',
        formulas: 'Fórmulas de cálculo',
        vmax: 'Voltaje máximo (Vmax)',
        vmin: 'Voltaje mínimo (Vmin)',
        vmppMin: 'Voltaje Vmpp mínimo',
        iscMax: 'Corriente máxima (Isc_max)'
      },
      forms: {
        title: 'Gestión de formularios',
        fields: 'Campos del formulario',
        voltages: 'Voltajes',
        currents: 'Corrientes',
        coefficients: 'Coeficientes',
        temperatures: 'Temperaturas'
      },
      users: {
        title: 'Gestión de usuarios',
        addUser: 'Crear usuario',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        defaultLanguage: 'Idioma predeterminado',
        createUser: 'Crear usuario',
        createdAt: 'Creado el',
        actions: 'Acciones',
        deleteConfirm: '¿Está seguro de que desea eliminar este usuario?',
        deleteUser: 'Eliminar usuario',
        userDeleted: 'Usuario eliminado correctamente',
        userDeleteError: 'Error al eliminar el usuario'
      },
      settings: {
        title: 'Ajustes de la aplicación',
        logo: {
          title: 'Logo de la aplicación',
          current: 'Logo actual',
          preview: 'Vista previa del nuevo logo',
          change: 'Cambiar logo',
          validate: 'Validar logo',
          cancel: 'Cancelar',
          format: 'Formato recomendado: PNG o SVG. Tamaño máximo: 2MB'
        }
      }
    },
    auth: {
      login: {
        title: 'Acceso a Administración',
        subtitle: 'Inicie sesión para gestionar microinversores',
        email: 'Correo electrónico',
        password: 'Contraseña',
        submit: 'Iniciar sesión',
        invalidCredentials: 'Credenciales inválidas'
      }
    }
  },
  zh: {
    calculator: {
      title: '哪款Solenso微型逆变器与您的太阳能板兼容？',
      subtitle: '输入您的太阳能板规格，找到适合您安装的Solenso微型逆变器。',
      example: {
        title: '示例值',
        description: '以下是450Wp太阳能板的典型值：',
        voltages: '电压',
        currents: '电流',
        coefficients: '温度系数',
        useValues: '使用这些值'
      },
      fields: {
        title: '您的太阳能板规格',
        voc: '开路电压 (Voc)',
        vmpp: '最大功率点电压 (Vmpp)',
        isc: '短路电流 (Isc)',
        impp: '最大功率点电流 (Impp)',
        coef_voc: 'Voc温度系数',
        coef_isc: 'Isc温度系数'
      },
      calculate: '查找兼容的微型逆变器',
      calculating: '搜索中...',
      results: {
        compatible: '兼容的微型逆变器',
        incompatible: '不兼容的微型逆变器',
        noResults: {
          title: '未找到兼容的微型逆变器',
          description: '您的太阳能板规格与我们当前微型逆变器的工作范围不匹配。',
          contact: '联系Solenso顾问'
        },
        backToForm: '返回表单',
        downloadPdf: '下载PDF',
        reasons: '不兼容原因：',
        technicalSheet: '技术规格表',
        viewProduct: '在solenso.fr上查看',
        calculatedValues: {
          title: '您的太阳能板计算值',
          vmax: '最大电压（-10°C时）',
          vmin: '最小电压（70°C时）',
          vmpp_min: '最小VMPP（70°C时）',
          isc_max: '最大电流（70°C时）'
        }
      }
    },
    admin: {
      navigation: {
        title: '管理',
        subtitle: '管理您的应用',
        'micro-inverters': '微型逆变器',
        'calculation-engine': '计算引擎',
        forms: '表单',
        users: '用户',
        settings: '设置',
        descriptions: {
          'micro-inverters': '管理微型逆变器目录',
          'calculation-engine': '配置计算公式',
          forms: '管理输入表单',
          users: '管理用户账户',
          settings: '配置账户设置'
        }
      },
      profile: {
        title: '我的个人资料',
        interfaceLanguage: '界面语言',
        validateLanguage: '确认语言',
        languageUpdated: '语言更新成功',
        languageUpdateError: '语言更新失败',
        updateEmail: '更新邮箱',
        newEmail: '新邮箱',
        currentPassword: '当前密码',
        updateEmailButton: '更新邮箱',
        emailUpdated: '邮箱更新成功',
        emailUpdateError: '邮箱更新失败',
        updatePassword: '更新密码',
        newPassword: '新密码',
        confirmNewPassword: '确认新密码',
        updatePasswordButton: '更新密码',
        passwordUpdated: '密码更新成功',
        passwordUpdateError: '密码更新失败',
        currentPasswordRequired: '请输入当前密码',
        incorrectPassword: '密码错误',
        passwordMismatch: '两次输入的密码不一致',
        passwordTooShort: '密码长度至少为6个字符'
      },
      microInverters: {
        title: '微型逆变器',
        add: '创建微型逆变器',
        name: '型号名称',
        voltageRange: '电压范围',
        vmppMin: '最小VMPP',
        iscMax: '最大电流 (Isc)',
        productUrl: '产品链接',
        image: '产品图片',
        datasheet: '技术规格书',
        edit: '编辑',
        delete: '删除',
        confirmDelete: '确认删除',
        cancel: '取消',
        confirm: '确认',
        duplicate: '复制',
        viewOnSolenso: '在solenso.fr上查看'
      },
      calculationEngine: {
        title: '计算引擎',
        formulas: '计算公式',
        vmax: '最大电压 (Vmax)',
        vmin: '最小电压 (Vmin)',
        vmppMin: '最小Vmpp电压',
        iscMax: '最大电流 (Isc_max)'
      },
      forms: {
        title: '表单管理',
        fields: '表单字段',
        voltages: '电压',
        currents: '电流',
        coefficients: '系数',
        temperatures: '温度'
      },
      users: {
        title: '用户管理',
        addUser: '创建用户',
        email: '邮箱',
        password: '密码',
        confirmPassword: '确认密码',
        defaultLanguage: '默认语言',
        createUser: '创建用户',
        createdAt: '创建时间',
        actions: '操作',
        deleteConfirm: '确定要删除此用户吗？',
        deleteUser: '删除用户',
        userDeleted: '用户删除成功',
        userDeleteError: '删除用户失败'
      },
      settings: {
        title: '应用设置',
        logo: {
          title: '应用标志',
          current: '当前标志',
          preview: '新标志预览',
          change: '更改标志',
          validate: '确认标志',
          cancel: '取消',
          format: '推荐格式：PNG或SVG。最大大小：2MB'
        }
      }
    },
    auth: {
      login: {
        title: '管理员登录',
        subtitle: '登录以管理微型逆变器',
        email: '邮箱地址',
        password: '密码',
        submit: '登录',
        invalidCredentials: '账号或密码错误'
      }
    }
  }
};