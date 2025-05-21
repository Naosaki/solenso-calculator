import type { TranslationSchema } from './types';

export const de: TranslationSchema = {
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
      vmpp: 'Spannung am maximalen Leistungspunkt (Vmpp)',
      isc: 'Kurzschlussstrom (Isc)',
      impp: 'Strom am maximalen Leistungspunkt (Impp)',
      coef_voc: 'Temperaturkoeffizient Voc',
      coef_isc: 'Temperaturkoeffizient Isc'
    },
    validation: {
      required: 'Dieses Feld ist erforderlich',
      positiveVoltage: 'Die Spannung muss positiv oder null sein',
      highVoltage: 'Die Spannung scheint zu hoch zu sein',
      positiveCurrent: 'Der Strom muss positiv oder null sein',
      highCurrent: 'Der Strom scheint zu hoch zu sein',
      negativeCoefVoc: 'Der Voc-Koeffizient ist in der Regel negativ',
      lowCoefVoc: 'Der Koeffizient scheint zu niedrig zu sein',
      positiveCoefIsc: 'Der Isc-Koeffizient ist in der Regel positiv',
      highCoefIsc: 'Der Koeffizient scheint zu hoch zu sein',
      vocGreaterThanVmpp: 'Voc muss größer als Vmpp sein',
      vmppLessThanVoc: 'Vmpp muss kleiner als Voc sein',
      iscGreaterThanImpp: 'Isc muss größer als Impp sein',
      imppLessThanIsc: 'Impp muss kleiner als Isc sein'
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
      },
      incompatibilityReasons: {
        lowVoltage: 'Die berechnete Mindestspannung ({value}V) ist niedriger als die vom Mikrowechselrichter akzeptierte Mindestspannung ({min}V)',
        highVoltage: 'Die berechnete Höchstspannung ({value}V) ist höher als die vom Mikrowechselrichter akzeptierte Höchstspannung ({max}V)',
        lowVmpp: 'Die berechnete minimale VMPP ({value}V) ist niedriger als die vom Mikrowechselrichter akzeptierte minimale VMPP ({min}V)',
        highCurrent: 'Der berechnete maximale Strom ({value}A) ist höher als der vom Mikrowechselrichter akzeptierte maximale Strom ({max}A)'
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
  },
  navigation: {
    userMenu: {
      profile: 'Mein Profil',
      administration: 'Administration',
      logout: 'Abmelden'
    }
  }
};