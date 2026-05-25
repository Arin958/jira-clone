import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import UserMenu from './UserMenu';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth0();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-800">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
          </div>
        </div>
        
        <UserMenu user={user} />
      </div>
    </nav>
  );
};

export default Navbar;