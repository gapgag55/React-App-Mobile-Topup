import React, {
  Component,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

// CSS
import styles from '../../style/child_page/status'

// NODE_MODULES
import Firebase from 'firebase'

// FIREBASE CONNECT
let user_id = new Firebase('https://mangtopup.firebaseio.com/users/');
let admin_status = new Firebase('https://mangtopup.firebaseio.com/settings/');

// FUNCTIONS
import commaMoney from '../functions/formatmoney'

// VARIABLE
let formatMoney;
let index;

class Topup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 'โปรดรอสักครู่...',
      style_status: {color: '#f1c40f'},
      text_status: 'ตรวจสอบ',
    }
  }

  componentDidMount() {
    setInterval(() => {
      AsyncStorage.getItem('key')
        .then(data => {

          // เรียก Firebase
          // ค้นหาข้อมูลทั้งหมดแล้ว นำค่าที่ได้
          // ไปเช็คกับ key แล้วดึง value ออกมา
          // และ set ค่าใหม่ให้กับ state
          user_id.once("value").then(amount => {

            // แปลง int to String
            // เพื่อที่จะสามารถใช้ substr แบ่งตัวเลข
            // ออกมาประกอบกันเช่น 1000 เป็น 1,000
            let amountFormat = amount.child(data).val().amount.toString();

            // METHOD FORMATMONEY
            // Method เปลี่ยนเลข 1000 เป็น 1,000
            formatMoney = commaMoney(amountFormat)
            this.setState({amount: 'ยอดเงินในระบบ: ' + formatMoney + '.-'})
          });

        });

      admin_status.child('status').once("value").then(STATUS => {
        if(STATUS.val().status) {
          this.setState({
            style_status: {color: '#0096aa'},
            text_status: 'ออนไลน์'
          })
        } else {
          this.setState({
            style_status: {color: '#e74c3c'},
            text_status: 'ออฟไลน์'
          })
        }
      })

    },1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
        <Text style={styles.text}>สถานะระบบ:   <Text style={this.state.style_status}>{this.state.text_status}</Text></Text>
        </View>
        <View style={styles.right}>
        <Text style={styles.text}>{this.state.amount}</Text>
        </View>
      </View>
    )
  }
}

export default Topup;
