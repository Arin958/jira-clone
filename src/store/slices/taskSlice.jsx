import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasks: {} // boardId: [tasks]
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state,action) => {
            const {boardId, task} = action.payload;
            if(state.tasks[boardId]) {
                state.tasks[boardId].push(task);
            } else {
                state.tasks[boardId] = [task];
            }
        },
        updateTask: (state,action) => {
            const {boardId, taskId, task} = action.payload;
            const taskIndex = state.tasks[boardId].findIndex(t => t.id === taskId);
            if(taskIndex !== -1) {
                state.tasks[boardId][taskIndex] = task;
            }
        },
        deleteTask: (state,action) => {
            const {boardId, taskId} = action.payload;
            state.tasks[boardId] = state.tasks[boardId].filter(t => t.id !== taskId);
        },
        moveTask:(state,action) => {
            const {sourceBoardId, destBoardId, taskId} = action.payload;
            const task = state.tasks[sourceBoardId].find(t => t.id === taskId);
            state.tasks[sourceBoardId] = state.tasks[sourceBoardId].filter(t => t.id !== taskId);
            state.tasks[destBoardId].push(task);
        }
    } 
})

export const {addTask, updateTask, deleteTask, moveTask} = tasksSlice.actions;
export default tasksSlice.reducer;