import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


import boardsReducer from './slices/boardSlice';
import tasksReducer from './slices/taskSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boards', 'tasks']
};

const rootReducer = combineReducers({
  boards: boardsReducer,
  tasks: tasksReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);