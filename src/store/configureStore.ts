import { AsyncStorage } from 'react-native';
import { NavigationState } from 'react-navigation';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer, {},
    compose(
      applyMiddleware(thunkMiddleware, logger),
      autoRehydrate(),
    )
  );

  persistStore(store, {
    storage: AsyncStorage,
    whitelist: [],
  });

  return store;
}
