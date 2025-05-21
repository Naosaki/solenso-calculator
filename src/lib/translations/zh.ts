import type { TranslationSchema } from './types';

export const zh: TranslationSchema = {
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
};