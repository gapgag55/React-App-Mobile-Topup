import React,{
  View,
  Text,
  Component,
  StyleSheet
} from 'react-native'

// NODE_MODULES
import Button from './button'

// CSS
import styles from '../../style/child_page/bottom'

class Bottom extends Component {
  render() {
    return (
      <View style={styles.bottom}>
        <View style={{alignItems: 'flex-start', flex: 1, marginBottom: 10}}>
            <Button
              text="วิธีการใช้งาน"
              onPress={() => this.props.navigator.push({name: 'howto'}) }
              onFocus="#eee"
              style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}
              />
          </View>

        <View style={{alignItems: 'flex-end', flex: 1}}>
            <Button
              text="ติดต่อสอบถามแฟนเพจ"
              onPress={() => this.props.navigator.push({name: 'fanpage'}) }
              onFocus="#eee"
              style={{borderBottomWidth: 1, borderBottomColor: '#ddd'}}
              />
        </View>
      </View>
    )
  }
}

export default Bottom;
