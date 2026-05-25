// Board.jsx - Fixed version
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBoard } from '../store/slices/boardSlice';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { 
  PlusIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  EllipsisHorizontalIcon 
} from '@heroicons/react/24/outline';
import { deleteTask, addTask, updateTask } from '../store/slices/taskSlice';

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);


  const { boards } = useSelector((state) => state.boards);
  const { tasks } = useSelector((state) => state.tasks);
  
  const currentBoard = boards.find(board => board.id === boardId);
  const boardTasks = tasks[boardId] || [];

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-500', icon: '📝' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-500', icon: '⚙️' },
    { id: 'done', title: 'Done', color: 'bg-green-500', icon: '✅' }
  ];


  const getTasksByColumn = (columnId) => {
    return boardTasks.filter(task => task?.status === columnId);
  };

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: selectedColumn,
      createdAt: new Date().toISOString(),
      comments: [],
      attachments: []
    };
    dispatch(addTask({ boardId, task: newTask }));
    setIsTaskModalOpen(false);
    setSelectedColumn(null);
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
  };

  const handleDeleteBoard = () => {
    if (window.confirm('Are you sure you want to delete this board? All tasks will be lost.')) {
      dispatch(deleteBoard(boardId));
      navigate('/dashboard');
    }
  };

  const handleMoveTask = useCallback((taskId, newStatus) => {
    const task = boardTasks.find(t => t.id === taskId);
    
    if (task && task.status !== newStatus) {
      dispatch(updateTask({
        boardId,
        taskId,
        updates: { status: newStatus }
      }));
      console.log(`Moved task ${taskId} from ${task.status} to ${newStatus}`);
    }
  }, [boardTasks, boardId, dispatch]);

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ boardId, taskId }));
    }
  };


  const handleDragStart = useCallback((e, taskId) => {

    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    
    setDraggedTaskId(taskId);
    
    // Add drag image (optional)
    if (e.target instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.target, 20, 20);
    }
    
    console.log('Drag started for task:', taskId);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, columnId) => {
    e.preventDefault();
    
    let taskId = e.dataTransfer.getData('text/plain');
    if (!taskId && draggedTaskId) {
      taskId = draggedTaskId;
    }
    
    if (taskId) {
      console.log(`Dropping task ${taskId} into column ${columnId}`);
      handleMoveTask(taskId, columnId);
    } else {
      console.warn('No taskId found during drop');
    }
    
    setDraggedTaskId(null);
  }, [handleMoveTask, draggedTaskId]);

  const handleDragEnd = useCallback(() => {
    setDraggedTaskId(null);
    console.log('Drag ended');
  }, []);

  if (!currentBoard) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Board not found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          Go back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Board Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentBoard.name}</h1>
              {currentBoard.description && (
                <p className="text-gray-600 mt-1">{currentBoard.description}</p>
              )}
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
            
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                  <button
                    onClick={handleDeleteBoard}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete Board
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto px-6 pb-6">
        <div className="flex space-x-6 min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByColumn(column.id);
            return (
              <div
                key={column.id}
                className="w-80 flex-shrink-0"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="bg-gray-100 rounded-t-lg p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{column.icon}</span>
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddTask(column.id)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Column Content */}
                <div className="bg-gray-50 rounded-b-lg p-3 min-h-[500px]">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-sm">No tasks</p>
                      <button
                        onClick={() => handleAddTask(column.id)}
                        className="mt-2 text-blue-600 text-sm hover:text-blue-700"
                      >
                        + Add a task
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onDragEnd={handleDragEnd}
                        >
                          <TaskCard
                            task={task}
                            onTaskClick={handleTaskClick}
                            onDeleteTask={handleDeleteTask}
                            onDragStart={handleDragStart}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedColumn(null);
        }}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default Board;