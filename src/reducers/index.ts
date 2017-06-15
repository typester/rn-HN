import { combineReducers } from 'redux';

import { NavigationState } from 'react-navigation';

import nav from './nav';
import news, { NewsState } from './news';

export interface RootState {
    nav: NavigationState;
    news: NewsState;
}

const rootReducer = combineReducers({
    nav,
    news,
})

export default rootReducer;
