import { SUPPORTED_LANGUAGES } from './constants';

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export interface TranslationSchema {
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
    validation: {
      required: string;
      positiveVoltage: string;
      highVoltage: string;
      positiveCurrent: string;
      highCurrent: string;
      negativeCoefVoc: string;
      lowCoefVoc: string;
      positiveCoefIsc: string;
      highCoefIsc: string;
      vocGreaterThanVmpp: string;
      vmppLessThanVoc: string;
      iscGreaterThanImpp: string;
      imppLessThanIsc: string;
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
      incompatibilityReasons: {
        lowVoltage: string;
        highVoltage: string;
        lowVmpp: string;
        highCurrent: string;
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
  navigation: {
    userMenu: {
      profile: string;
      administration: string;
      logout: string;
    };
  };
}