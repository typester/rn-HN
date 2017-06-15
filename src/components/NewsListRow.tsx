import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../reducers';
import { NewsType, fetchNewsItem } from '../actions/news';
import { NewsItemsState } from '../reducers/news';

interface StateProps {
  items: NewsItemsState;
}

interface DispatchProps {
  fetchItem: (id: number) => Action;
}

interface OwnProps {
  newsId: number;
}

type Props = StateProps & DispatchProps & OwnProps;

class NewsListRow extends React.Component<Props, {}> {
  componentDidMount() {
    const { newsId } = this.props;
    const item = this.props.items.map.get(newsId);

    if (!item) {
      this.props.fetchItem(newsId);
    }
  }

  render() {
    const item = this.props.items.map.get(this.props.newsId);

    if (item) {
      return (
        <View>
          <Text>{ item.title }</Text>
        </View>
      );
    } else {
      /* loading */
      return (
        <View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.news.Items,
});
const dispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchItem: (id: number) => dispatch(fetchNewsItem(id)),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, dispatchToProps)(NewsListRow);
