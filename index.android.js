import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  DrawerLayoutAndroid,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import App from './src/app'

class topupmang extends Component {

  render() {
    return (
    <App />
    );
  }
}


AppRegistry.registerComponent('topupmang', () => topupmang);
