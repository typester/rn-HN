import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers, NavigationState, NavigationAction } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {RootState} from './reducers';
import TopStoriesScreen from './screens/TopStoriesScreen';
import BestStoriesScreen from './screens/BestStoriesScreen';
import NewStoriesScreen from './screens/NewStoriesScreen';
import WebView from './components/WebView';

export const MainTabStack = StackNavigator({
  MainTab: {
    screen: TabNavigator({
      Top: {
        screen: TopStoriesScreen,
      },
      Best: {
        screen: BestStoriesScreen,
      },
      New: {
        screen: NewStoriesScreen,
      },
    }, {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      lazy: true,
      backBehavior: 'initialRoute',
      initialRouteName: 'Top',
    }),
  },

  WebView: {
    screen: WebView,
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

interface RouterStateProps {
  nav: NavigationState;
}

interface RouterDispatchProps {
  dispatch: Dispatch<NavigationAction>;
}

interface RouterOwnProps {
}

class Router extends React.Component<RouterStateProps & RouterDispatchProps & RouterOwnProps, any> {
  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });

    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = (state: RootState) => ({ nav: state.nav });
const dispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

export default connect<RouterStateProps, RouterDispatchProps, RouterOwnProps>(mapStateToProps, dispatchToProps)(Router);
