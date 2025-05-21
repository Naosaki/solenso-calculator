import type { TranslationSchema } from './types';

export const es: TranslationSchema = {
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
    validation: {
      required: 'Este campo es obligatorio',
      positiveVoltage: 'El voltaje debe ser positivo o cero',
      highVoltage: 'El voltaje parece demasiado alto',
      positiveCurrent: 'La corriente debe ser positiva o cero',
      highCurrent: 'La corriente parece demasiado alta',
      negativeCoefVoc: 'El coeficiente Voc suele ser negativo',
      lowCoefVoc: 'El coeficiente parece demasiado bajo',
      positiveCoefIsc: 'El coeficiente Isc suele ser positivo',
      highCoefIsc: 'El coeficiente parece demasiado alto',
      vocGreaterThanVmpp: 'Voc debe ser mayor que Vmpp',
      vmppLessThanVoc: 'Vmpp debe ser menor que Voc',
      iscGreaterThanImpp: 'Isc debe ser mayor que Impp',
      imppLessThanIsc: 'Impp debe ser menor que Isc'
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
      confirmNewPassword: 'Confirmar nueva contraseña',
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
  },
  navigation: {
    userMenu: {
      profile: 'Mi perfil',
      administration: 'Administración',
      logout: 'Cerrar sesión'
    }
  }
};