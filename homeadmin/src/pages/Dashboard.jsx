import { 
  UserGroupIcon, 
  DocumentCheckIcon, 
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const stats = [
  {
    name: 'Total Users',
    value: '2,500',
    change: '+15%',
    changeType: 'increase',
    icon: UserGroupIcon,
  },
  {
    name: 'Active Claims',
    value: '120',
    change: '+12%',
    changeType: 'increase',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Monthly Revenue',
    value: '$50,000',
    change: '+18%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Pending Documents',
    value: '25',
    change: '-5%',
    changeType: 'decrease',
    icon: ClipboardDocumentCheckIcon,
  },
];

const quickActions = [
  {
    name: 'Create User',
    icon: UserPlusIcon,
    path: '/users/new',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    hoverBgColor: 'hover:bg-blue-200'
  },
  {
    name: 'New Policy',
    icon: DocumentPlusIcon,
    path: '/policies/new',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    hoverBgColor: 'hover:bg-green-200'
  },
  {
    name: 'Process Claim',
    icon: DocumentCheckIcon,
    path: '/claims/new',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    hoverBgColor: 'hover:bg-purple-200'
  },
  {
    name: 'View Reports',
    icon: ChartBarIcon,
    path: '/reports',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    hoverBgColor: 'hover:bg-yellow-200'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (path) => {
    navigate(path);
  };

  return (
    <PageLayout 
      title="Dashboard Overview"
      headerContent={
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500 dark:text-gray-400">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <DocumentCheckIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    New claim submitted
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    John Doe submitted a new claim for property damage
                  </p>
                </div>
                <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  2h ago
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={() => handleQuickAction(action.path)}
                className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${action.color} ${action.bgColor} ${action.hoverBgColor} dark:text-${action.color.split('-')[1]}-200 dark:bg-${action.bgColor.split('-')[1]}-900 dark:hover:bg-${action.hoverBgColor.split('-')[1]}-800`}
              >
                <action.icon className="h-5 w-5 mr-2" />
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}