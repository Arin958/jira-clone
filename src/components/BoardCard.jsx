
import { FolderIcon } from '@heroicons/react/24/outline';

const BoardCard = ({ board, onClick }) => {
  const getColorClass = (color) => {
    const colorMap = {
      'bg-blue-500': 'from-blue-500 to-blue-600',
      'bg-green-500': 'from-green-500 to-green-600',
      'bg-purple-500': 'from-purple-500 to-purple-600',
      'bg-pink-500': 'from-pink-500 to-pink-600',
      'bg-yellow-500': 'from-yellow-500 to-yellow-600',
      'bg-indigo-500': 'from-indigo-500 to-indigo-600'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      <div className={`h-32 bg-linear-to-r ${getColorClass(board?.color)} flex items-center justify-center`}>
        <FolderIcon className="h-12 w-12 text-white opacity-75" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{board?.name}</h3>
        {board.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{board.description}</p>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Created {new Date(board?.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center">
            <span className="mr-1">📋</span> {board.taskCount || 0} tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;