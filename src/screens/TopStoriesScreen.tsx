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

export default class TopStoriesScreen extends React.Component<Prop, {}> {
  static navigationOptions: StackNavigatorScreenOptions & TabNavigatorScreenOptions = {
    title: 'Top Stories',
    tabBarLabel: 'Top',
  }

  render() {
    return (
      <View>
        <NewsList newsType={NewsType.Top} onPressNews={(item) => this.onPressNews(item)} />
      </View>
    );
  }

  onPressNews(item: Item) {
    this.props.navigation.navigate("WebView", { item });
  }
}
