import React from 'react';
import { WebView as WV } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

export default class WebView extends React.Component<Props, {}> {
  static navigationOptions = (p: any) => ({
    title: p.navigation.state.params.item.title,
  });

  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <WV source={{uri: item.url}}/>
    );
  }
}
