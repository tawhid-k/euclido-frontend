import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import comparePrograms from './compareProgramsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    compare: comparePrograms
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
