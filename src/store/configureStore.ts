import { AsyncStorage } from 'react-native';
import { NavigationState } from 'react-navigation';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate, persistStore } from 'redux-persist';

import rootReducer from '../reducers';

export interface AppState {
    nav?: NavigationState;
}

const defaultState: AppState = {};

export default function configureStore(initialState = defaultState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            autoRehydrate(),
        )
    );

    persistStore(store, {
        storage: AsyncStorage,
        blacklist: ['nav'],
    });

    return store;
}
