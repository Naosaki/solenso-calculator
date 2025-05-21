import type { TranslationSchema } from './types';

export const fr: TranslationSchema = {
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
    validation: {
      required: 'Ce champ est requis',
      positiveVoltage: 'La tension doit être positive ou nulle',
      highVoltage: 'La tension semble trop élevée',
      positiveCurrent: 'Le courant doit être positif ou nul',
      highCurrent: 'Le courant semble trop élevé',
      negativeCoefVoc: 'Le coefficient Voc est généralement négatif',
      lowCoefVoc: 'Le coefficient semble trop faible',
      positiveCoefIsc: 'Le coefficient Isc est généralement positif',
      highCoefIsc: 'Le coefficient semble trop élevé',
      vocGreaterThanVmpp: 'Voc doit être supérieur à Vmpp',
      vmppLessThanVoc: 'Vmpp doit être inférieur à Voc',
      iscGreaterThanImpp: 'Isc doit être supérieur à Impp',
      imppLessThanIsc: 'Impp doit être inférieur à Isc'
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
      },
      incompatibilityReasons: {
        lowVoltage: 'La tension minimale calculée ({value}V) est inférieure à la tension minimale acceptée par le micro-onduleur ({min}V)',
        highVoltage: 'La tension maximale calculée ({value}V) est supérieure à la tension maximale acceptée par le micro-onduleur ({max}V)',
        lowVmpp: 'La tension VMPP minimale calculée ({value}V) est inférieure à la tension VMPP minimale acceptée par le micro-onduleur ({min}V)',
        highCurrent: 'Le courant maximal calculé ({value}A) est supérieur au courant maximal accepté par le micro-onduleur ({max}A)'
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
  },
  navigation: {
    userMenu: {
      profile: 'Mon profil',
      administration: 'Administration',
      logout: 'Déconnexion'
    }
  }
};