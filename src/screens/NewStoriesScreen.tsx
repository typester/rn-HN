import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigatorScreenOptions, TabNavigatorScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { RootState } from '../reducers';
import { NewsStatePayload } from '../reducers/news';
import { fetchNewsIds, NewsType, NewsAction } from '../actions/news';

import NewsList from '../components/NewsList';

export default class TopStoriesScreen extends React.Component<{}, {}> {
  static navigationOptions: StackNavigatorScreenOptions & TabNavigatorScreenOptions = {
    title: 'New Stories',
    tabBarLabel: 'New',
  }

  render() {
    return (
      <View>
        <NewsList newsType={NewsType.New}/>
      </View>
    );
  }
}
