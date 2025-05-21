import type { TranslationSchema } from './types';

export const en: TranslationSchema = {
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
      title: 'Solar Panel Specifications',
      voc: 'Open Circuit Voltage (Voc)',
      vmpp: 'Maximum Power Point Voltage (Vmpp)',
      isc: 'Short Circuit Current (Isc)',
      impp: 'Maximum Power Point Current (Impp)',
      coef_voc: 'Voc Temperature Coefficient',
      coef_isc: 'Isc Temperature Coefficient'
    },
    validation: {
      required: 'This field is required',
      positiveVoltage: 'Voltage must be positive or zero',
      highVoltage: 'Voltage seems too high',
      positiveCurrent: 'Current must be positive or zero',
      highCurrent: 'Current seems too high',
      negativeCoefVoc: 'Voc coefficient is usually negative',
      lowCoefVoc: 'Coefficient seems too low',
      positiveCoefIsc: 'Isc coefficient is usually positive',
      highCoefIsc: 'Coefficient seems too high',
      vocGreaterThanVmpp: 'Voc must be greater than Vmpp',
      vmppLessThanVoc: 'Vmpp must be less than Voc',
      iscGreaterThanImpp: 'Isc must be greater than Impp',
      imppLessThanIsc: 'Impp must be less than Isc'
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
      },
      incompatibilityReasons: {
        lowVoltage: 'The calculated minimum voltage ({value}V) is lower than the minimum voltage accepted by the micro-inverter ({min}V)',
        highVoltage: 'The calculated maximum voltage ({value}V) is higher than the maximum voltage accepted by the micro-inverter ({max}V)',
        lowVmpp: 'The calculated minimum VMPP ({value}V) is lower than the minimum VMPP accepted by the micro-inverter ({min}V)',
        highCurrent: 'The calculated maximum current ({value}A) is higher than the maximum current accepted by the micro-inverter ({max}A)'
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
      subtitle: 'Sign in to manage micro-inverters',
      email: 'Email address',
      password: 'Password',
      submit: 'Sign in',
      invalidCredentials: 'Invalid credentials'
    }
  },
  navigation: {
    userMenu: {
      profile: 'My Profile',
      administration: 'Administration',
      logout: 'Sign Out'
    }
  }
};