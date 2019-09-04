import {createStore, applyMiddleware, compose} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import appReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk, createLogger()];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(
  persistedReducer,
  composeEnhancers(...enhancers),
);

export const persistor = persistStore(store);

// TODO Properly migrate state structure on change
persistor.purge().then(r => console.log('Persisted state purged...', r));
