// เป็น TextInput ที่ใช้ใน Transfer
// เป็นการทำ Style สวยๆ แบบ Transfer Component นั่นเอง
// ลองเปิดดูได้ในเมนูการแจ้งโอนเงิน
// จะใช้ในช่อง ไอดี จำนวนเงิน และ เวลาที่โอน
// ที่ทำเพราะว่ามันใช้เหมือนกันเลยนะจ้ะ

import React, {
  Component,
  Text,
  View,
  TextInput,
} from 'react-native';

class TextInputForm extends Component {
  render() {
    return (
      <View style={this.props.rowStyle}>
        <View style={this.props.leftStyle}>
          <Text style={this.props.titleStyle}>{this.props.textTitle}</Text>
        </View>
        <View style={this.props.rightStyle}>
          <TextInput
            style={{marginTop: 5}}
            onChange={(data) => {this.props.onChange(data)}}
            value={this.props.value}
            keyboardType={this.props.keyboardType}
            placeholder={this.props.placeholder}
            underlineColorAndroid="rgba(255,255,255,0)"
            />
        </View>
      </View>
    )
  }
}

export default TextInputForm;
