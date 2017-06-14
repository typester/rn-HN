import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import TopStoriesScreen from './screens/TopStoriesScreen';

export const MainTabStack = StackNavigator({
  MainTab: {
    screen: TabNavigator({
      Top: {
        screen: TopStoriesScreen,
      },
    }, {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      backBehavior: 'none',
    }),
  },
});

export const AppNavigator = StackNavigator({
  Main: { screen: MainTabStack },
}, {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    cardStack: {
      gesturesEnabled: false,
    },
  },
});
