import React from 'react';
import { Provider } from 'react-redux';
import { NavigationState, addNavigationHelpers } from 'react-navigation';

import Router from './router';
import configureStore from './store/configureStore';

const store = configureStore();

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Router/>
      </Provider>
    );
  }
}
