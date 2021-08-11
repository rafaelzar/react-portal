import { useDispatch } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
};

const composeEnhancers = process.env.REACT_APP_ENVIRONMENT === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = (): any => useDispatch<AppDispatch>();

export default store;
