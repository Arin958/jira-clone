import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: {}, // boardId: [tasks]
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { boardId, task } = action.payload;
      
      if (!task || !task.id) {
        console.error('Invalid task in addTask:', task);
        return;
      }
      
      if (!state.tasks[boardId]) {
        state.tasks[boardId] = [];
      }
      state.tasks[boardId].push(task);
      console.log('Task added:', task);
    },
    
    updateTask: (state, action) => {
      const { boardId, taskId, updates } = action.payload;
      
      if (!state.tasks[boardId]) {
        console.warn(`Board ${boardId} not found for task update`);
        return;
      }
      
      const taskIndex = state.tasks[boardId].findIndex(t => t && t.id === taskId);
      
      if (taskIndex !== -1) {
        state.tasks[boardId][taskIndex] = { 
          ...state.tasks[boardId][taskIndex], 
          ...updates 
        };
      } else {
        console.warn(`Task ${taskId} not found in board ${boardId}`);
      }
    },
    
    deleteTask: (state, action) => {
      const { boardId, taskId } = action.payload;
      
      if (!state.tasks[boardId]) {
        console.warn(`Board ${boardId} not found for task deletion`);
        return;
      }
      
      state.tasks[boardId] = state.tasks[boardId].filter(t => t && t.id !== taskId);
    },
    
    moveTask: (state, action) => {
      const { boardId, taskId, newStatus } = action.payload;
      
      if (!state.tasks[boardId]) {
        console.warn(`Board ${boardId} not found for task move`);
        return;
      }
      
      const taskIndex = state.tasks[boardId].findIndex(t => t && t.id === taskId);
      
      if (taskIndex !== -1 && state.tasks[boardId][taskIndex]) {
        state.tasks[boardId][taskIndex].status = newStatus;
      } else {
        console.warn(`Task ${taskId} not found in board ${boardId}`);
      }
    },
    
    clearNullTasks: (state, action) => {
      const { boardId } = action.payload;
      if (state.tasks[boardId]) {
        state.tasks[boardId] = state.tasks[boardId].filter(t => t !== null);
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask, clearNullTasks } = taskSlice.actions;
export default taskSlice.reducer;