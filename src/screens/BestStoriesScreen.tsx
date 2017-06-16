import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigatorScreenOptions, TabNavigatorScreenOptions, NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { RootState } from '../reducers';
import { NewsStatePayload, Item } from '../reducers/news';
import { fetchNewsIds, NewsType, NewsAction } from '../actions/news';

import NewsList from '../components/NewsList';

interface Prop {
  navigation?: NavigationScreenProp<any, any>;
}

export default class BestStoriesScreen extends React.Component<Prop, {}> {
  static navigationOptions: StackNavigatorScreenOptions & TabNavigatorScreenOptions = {
    title: 'Best Stories',
    tabBarLabel: 'Best',
  }

  render() {
    return (
      <View>
        <NewsList newsType={NewsType.Best} onPressNews={(item) => this.onPressNews(item)} />
      </View>
    );
  }

  onPressNews(item: Item) {
    this.props.navigation.navigate("WebView", { url: item.url });
  }
}
