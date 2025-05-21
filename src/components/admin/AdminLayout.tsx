// Composant AdminLayout
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Zap, 
  Calculator, 
  FormInput, 
  Settings as SettingsIcon,
  Users,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const menuItems = [
  {
    path: 'micro-inverters',
    icon: Zap,
  },
  {
    path: 'calculation-engine',
    icon: Calculator,
  },
  {
    path: 'forms',
    icon: FormInput,
  },
  {
    path: 'users',
    icon: Users,
  },
  {
    path: 'settings',
    icon: SettingsIcon,
  }
];

export function AdminLayout() {
  const { t } = useLanguage();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('admin.navigation.title')}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t('admin.navigation.subtitle')}
          </p>
        </div>
        
        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm
                ${isActive 
                  ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <div className="flex-1">
                <div className="font-medium">{t(`admin.navigation.${item.path}`)}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {t(`admin.navigation.descriptions.${item.path}`)}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </div>
    </div>
  );
}