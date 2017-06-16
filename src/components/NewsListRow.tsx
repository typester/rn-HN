import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { NavigationProp } from 'react-navigation';

import { RootState } from '../reducers';
import { NewsType, fetchNewsItem } from '../actions/news';
import { NewsItemsState, Item } from '../reducers/news';

interface StateProps {
  items: NewsItemsState;
}

interface DispatchProps {
  fetchItem: (id: number) => Action;
}

interface OwnProps {
  newsId: number;
  onPress: (item: Item) => void;
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
    const { onPress } = this.props;

    if (item) {
      return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
          <Text style={styles.title}>{ item.title }</Text>
          <View style={styles.meta}>
            <View style={styles.metaPoint}>
              <Text style={styles.metaText}>{item.score}points</Text>
            </View>
            <View style={styles.metaBy}>
              <Text style={styles.metaText}>by: </Text><Text style={[styles.metaText, styles.textBold]}>{ item.by }</Text>
            </View>
            <View style={styles.metaDate}>
              <Text style={styles.metaText}>{new Date(item.time*1000).toLocaleString('en-US')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      /* loading */
      return (
        <View style={[styles.container, styles.spinnerContainer]}>
          <ActivityIndicator style={styles.spinner}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },

  spinnerContainer: {
    justifyContent: 'center',
  },

  spinner: {
    alignSelf: 'flex-start',
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  meta: {
    flexDirection: 'row',
  },

  metaText: {
    fontSize: 11,
    color: '#999',
  },

  textBold: {
    fontWeight: 'bold',
  },

  metaPoint: {
    marginRight: 5,
  },

  metaBy: {
    flexDirection: 'row',
  },

  metaDate: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
