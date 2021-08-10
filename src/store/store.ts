import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = (): any => useDispatch<AppDispatch>();

export default store;
