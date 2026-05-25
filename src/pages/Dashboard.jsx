import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBoard, setCurrentBoard } from '../store/slices/boardsSlice';
import { useNavigate } from 'react-router-dom';
import CreateBoardModal from '../components/CreateBoardModal';
import BoardCard from '../components/BoardCard';
import { PlusIcon, Square2StackIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boards } = useSelector((state) => state.boards);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBoard = (boardData) => {
    const newBoard = {
      id: Date.now().toString(),
      ...boardData,
      createdAt: new Date().toISOString(),
      taskCount: 0
    };
    dispatch(addBoard(newBoard));
    setIsModalOpen(false);
  };

  const handleBoardClick = (board) => {
    dispatch(setCurrentBoard(board));
    navigate(`/board/${board.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Boards</h1>
          <p className="text-gray-600 mt-1">Manage and track your projects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Board
        </button>
      </div>

      {boards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Square2StackIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No boards yet</h3>
          <p className="text-gray-600 mb-4">Create your first board to get started</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Your First Board
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard 
              key={board.id} 
              board={board} 
              onClick={() => handleBoardClick(board)}
            />
          ))}
        </div>
      )}

      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
};

export default Dashboard;