import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  currentBoard: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload,
      );
      if (state.currentBoard?.id === action.payload) {
        state.currentBoard = null;
      }
    },
  },
});

export const { addBoard, setCurrentBoard, deleteBoard } = boardSlice.actions;
export default boardSlice.reducer;
