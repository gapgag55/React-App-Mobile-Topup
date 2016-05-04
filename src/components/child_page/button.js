// ตอนนี้ Button ใช้ในหน้าของ
// Topup และ Transfer
// (แจ้งเติมเงิน และ แจ้งโอนเงินเข้าระบบ) นั่นเอง

import React, {
  Component,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={this.props.style}
        underlayColor={this.props.onFocus}
        >
        <Text style={this.props.fontStyle}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
}

export default Button;
