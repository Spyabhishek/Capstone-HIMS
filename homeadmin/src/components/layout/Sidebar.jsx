import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  HomeIcon, 
  UserGroupIcon as AdminGroupIcon, 
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const adminNavigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Admin', to: '/admins', icon: AdminGroupIcon },
  { name: 'Policies', to: '/policies', icon: DocumentTextIcon },
  { name: 'Claims', to: '/claims', icon: ClipboardDocumentCheckIcon },
  { name: 'Documents', to: '/payments', icon: CurrencyDollarIcon },
];

const userNavigation = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'My Policies', to: '/policies', icon: DocumentTextIcon },
  { name: 'My Claims', to: '/claims', icon: ClipboardDocumentCheckIcon },
];

export default function Sidebar({ darkMode, toggleDarkMode, isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';
  const navigation = isAdmin ? adminNavigation : userNavigation;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.info('You have been logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Insurance {isAdmin ? 'Admin' : 'Portal'}
        </h1>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              location.pathname === item.to
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <item.icon className="w-6 h-6 mr-3" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 space-y-4 border-t dark:border-gray-700">
        <button
          onClick={toggleDarkMode}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <>
              <MoonIcon className="w-6 h-6 mr-3" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <SunIcon className="w-6 h-6 mr-3" />
              <span>Light Mode</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
        >
          <XMarkIcon className="w-6 h-6 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}