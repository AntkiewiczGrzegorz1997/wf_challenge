import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
