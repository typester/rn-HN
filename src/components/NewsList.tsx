import React from 'react';
import { ListView, ListViewDataSource, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { RootState } from '../reducers';
import { NewsType, fetchNewsIds } from '../actions/news';
import { NewsIdsState, NewsStatePayload, Item } from '../reducers/news';
import NewsListRow from '../components/NewsListRow';

interface StateProps {
  news: NewsIdsState
}

interface DispatchProps {
  fetchNews: (type: NewsType) => Action;
}

interface OwnProps {
  newsType: NewsType;
  onPressNews: (item: Item) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
  ds: ListViewDataSource
}

class NewsList extends React.Component<Props, State> {
  componentWillMount() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.setState({
      ds: ds.cloneWithRows(this.newsPayload().ids)
    });
  }

  componentDidMount() {
    let news = this.newsPayload()

    if (news.ids.length == 0) {
      this.props.fetchNews(this.props.newsType);
    }
  }

  componentWillReceiveProps(nextProps: Props, nextContext: any) {
    let payload = this.newsPayload();
    let nextPayload = this.newsPayload(nextProps);

    if (JSON.stringify(payload.ids) != JSON.stringify(nextPayload.ids)) {
      this.setState({
        ds: this.state.ds.cloneWithRows(nextPayload.ids)
      });
    }
  }

  newsPayload(props: Props = this.props) : NewsStatePayload {
    switch (props.newsType) {
      case NewsType.Best:
        return props.news.BestStories;
      case NewsType.New:
        return props.news.NewStories;
      case NewsType.Top:
        return props.news.TopStories;
    }
  }

  render() {
    const payload = this.newsPayload();

    if (payload.ids.length == 0) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator style={styles.spinner}/>
        </View>
      );
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.state.ds}
        renderRow={(id) => <NewsListRow newsId={id} onPress={(item) => this.props.onPressNews(item) } />} />
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
  },

  spinner: {
    marginTop: 20,
  },
});

const mapStateToProps = (state: RootState) => ({
  news: state.news.Ids,
});

const dispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchNews: (type: NewsType) => dispatch(fetchNewsIds(type)),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, dispatchToProps)(NewsList);
