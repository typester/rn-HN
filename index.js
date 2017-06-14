import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './build';

const HN = () => <App/>;

AppRegistry.registerComponent('HN', () => HN);
