import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth0();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        {user?.picture ? (
          <img 
            src={user.picture} 
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user?.name?.[0] || 'U'}
          </div>
        )}
        <span className="text-gray-700 hidden md:inline">{user?.name}</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;