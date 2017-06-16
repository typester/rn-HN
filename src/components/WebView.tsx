import React from 'react';
import { WebView as WV } from 'react-native';
import { NavigationProp } from 'react-navigation';

interface Props {
  title: string;
  url: string;
  navigation?: NavigationProp<any, any>;
}

export default class WebView extends React.Component<Props, {}> {
  render() {
    const { url } = this.props.navigation.state.params;

    return (
      <WV url={url}/>
    );
  }
}
