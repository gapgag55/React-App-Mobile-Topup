import React, {
  WebView,
  Component,
  View
} from 'react-native'

// CSS
import styles from '../../style/page/fanpage'

// FUNCTIONS
import onBackAndroid from '../functions/onBackAndroid'

class Fanpage extends Component {
  _back() {
    this.props.navigator.pop();
    return true
  }

  componentWillMount() {

    // เมื่อ User 
    // กดปุ่ม Back บน Android
    onBackAndroid(this.props.navigator)
  }


  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: 'https://www.facebook.com/duokap/'}}
          scalesPageToFit={true}
        />
      </View>
    )
  }
}

export default Fanpage;
