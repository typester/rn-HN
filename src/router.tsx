import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, addNavigationHelpers, NavigationState, NavigationAction } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {AppState} from './store/configureStore';
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

const mapStateToProps = (state: AppState) => ({ nav: state.nav });
const dispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

export default connect<RouterStateProps, RouterDispatchProps, RouterOwnProps>(mapStateToProps, dispatchToProps)(Router);
