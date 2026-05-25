
import { TrashIcon, ChatBubbleLeftIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const TaskCard = ({ task, onTaskClick, onDeleteTask, onDragStart }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onTaskClick(task)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1">
          {task.title}
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task.id);
          }}
          className="ml-2 text-gray-400 hover:text-red-600"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority || 'medium'}
          </span>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-400 text-xs">
          {task.comments?.length > 0 && (
            <div className="flex items-center">
              <ChatBubbleLeftIcon className="h-3 w-3 mr-1" />
              <span>{task.comments.length}</span>
            </div>
          )}
          {task.attachments?.length > 0 && (
            <div className="flex items-center">
              <PaperClipIcon className="h-3 w-3 mr-1" />
              <span>{task.attachments.length}</span>
            </div>
          )}
        </div>
      </div>

      {task.dueDate && (
        <div className="mt-2 text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TaskCard;