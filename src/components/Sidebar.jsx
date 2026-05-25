import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  Squares2X2Icon, 
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: HomeIcon },
    { path: '/boards', name: 'Boards', icon: Squares2X2Icon },
    { path: '/settings', name: 'Settings', icon: Cog6ToothIcon }
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">Jira Clone</h1>}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded hover:bg-gray-700"
        >
          {isOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 my-1 transition-colors
              ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
              ${!isOpen && 'justify-center'}
            `}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;