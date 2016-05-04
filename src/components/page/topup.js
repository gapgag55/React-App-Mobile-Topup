import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Alert,
  AsyncStorage
} from 'react-native';

// CHILD_COMPONENTS
import Status from '../child_page/status'
import Button from '../child_page/button'
import Bottom from '../child_page/bottom'

// CSS
import styles from '../../style/page/topup'

// NODE_MODULES
import Spinner from 'react-native-loading-spinner-overlay';
import Firebase from 'firebase'

// FIREBASE CONNECT
let user_id = new Firebase('https://mangtopup.firebaseio.com/users/');
let user_topup = new Firebase('https://mangtopup.firebaseio.com/topups/');

// FUNCTIONS
import commaMoney from '../functions/formatmoney'
import formatMinutes from '../functions/formatMinutes'
import reset from '../functions/resetTopup'

// VARIABLE
let formatMoney

class Topup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone_number: '',
      amount_topup: '',
      system: '',
      isLoading: false
    }

  }

  finish() {
    let { phone_number, amount_topup, system } = this.state;
    this.setState({
      isLoading: true
    })

    AsyncStorage.getItem('key')
      .then(KEY => {
        user_id.child(KEY).once("value").then(USER => {
          let user = USER.val();

          AsyncStorage.getItem('id')
            .then(ID => {

              this.setState({
                isLoading: false
              })

              if(user.id == ID) {
                if (phone_number.length == 10 && amount_topup && system != '') {

                  let topup_balance = (Number(amount_topup) + 2);
                  let money_balance = (user.amount - topup_balance);

                  // ถ้ายอดเงินมีมากกว่าที่จะเติม
                  // เนื่องจาก user.amount เป็น String
                  // เราต้องทำการ casting ให้เป็น Int เสียก่อน
                  // เพื่อเปรียบเทียบค่า Int and Int
                  if(user.amount >= amount_topup) {

                    // Format phone_number
                    // จาก 0925469001 เป็น 092-546-9001
                    phone_number = phone_number.substr(0,3) + '-' + phone_number.substr(3,3) + '-' + phone_number.substr(6,4)

                    // แปลง int เป็น String
                    // เพื่อส่งไปยัง commaMoney
                    money_balance = money_balance.toString()

                    // METHOD FORMATMONEY
                    // Method เปลี่ยนเลข 1000 เป็น 1,000
                    formatMoney = commaMoney(money_balance)

                    Alert.alert(
                      'ตรวจสอบความถูกต้อง',
                      'เบอร์มือถือ: ' + phone_number + '\n' +
                      'จำนวน: ' + amount_topup + '.-\n' +
                      'เครือข่าย: ' + system + '\n\n' +
                      'ค่าบริการ: 2.-\n' +
                      'ยอดชำระ: ' + topup_balance + '\n' +
                      'ยอดเงินคงเหลือในระบบ: ' + formatMoney + '.-',
                      [
                        {text: 'ยกเลิก'},
                        {text: 'ตกลง', onPress: () => {

                            // update amount ใน key นั้นๆ
                            let updateUser = user_id.child(KEY).update({
                              // เนื่องจากเราได้แปลง money_balance เป็น String
                              // เพื่อส่งค่าไปยัง commaMoney แปลง 1000 เป็น 1,000
                              // ถ้าเราไม่ casting Number ปัญหาคือ
                              // เมื่อเราเติมเงินอีกรอบ มันจะฟ้องว่า ยอดเงินไม่พอทำรายการ
                              // เนื่องจากตอนเปรียบเทียบ if ข้างบน
                              // มันเป็น string >= int
                              // ฉะนั้นเราต้องทำการ casting เป็น int ลงไปใน Firebase
                              // เพื่อจะได้ if int >= int
                              // ได้ถูกต้อง
                              amount: Number(money_balance)
                            })

                            // เพิ่ม history_topup ที่ key นั้นๆ

                            let DATE = new Date()
                            let newHistoryTopup = user_id.child(KEY + '/history_topup').push()
                            newHistoryTopup.set({
                              amount: amount_topup,
                              balance: formatMoney,
                              date: DATE.getDay() + '/' + (DATE.getMonth() + 1) + '/' + (DATE.getFullYear() + 543) + '   ' + DATE.getHours() + ':' + formatMinutes(DATE.getMinutes()),
                              key: newHistoryTopup.key(),
                              phone_number: phone_number,
                              // 0 ดำเนินรายการ
                              // 1 สำเร็จ
                              // 2 ล้มเหลว
                              announce: 0
                            })

                            // ส่ง history ใน topup
                            let newTopup = user_topup.push();
                            newTopup.set({
                              amount: amount_topup,
                              key: newTopup.key(),
                              key_user: KEY,
                              key_history_topup: newHistoryTopup.key(),
                              phone_number: phone_number,
                              system: system,
                              user_id: user.id,
                            })


                            // เมื่อทำสำเร็จให้ RESET
                            reset(this)

                            Alert.alert(
                              'การทำรายการสำเร็จ',
                              'ระบบจะเติมเงินให้ท่านภายใน 30 นาที \n\n **หมายเหตุ \nหากทำรายการเกิน 30 นาที ติดต่ออีเมล zxc5546@hotmai.com')
                          }
                        }
                      ]
                    )
                  } else {
                    Alert.alert('ผิดพลาด', 'ยอดเงินของคุณไม่พอการทำรายการ')
                  }


                } else if (phone_number.length != 10 || amount_topup == '' || system == undefined) {
                  Alert.alert('ผิดพลาด', 'กรอกข้อมูลให้ครบ',[{text: 'ตกลง'}])
                }
              } else {
                Alert.alert('ผิดพลาด', 'ดูเหมือนว่าระบบของคุณจะไม่ถูกต้อง',[{text: 'ตกลง'}])
              }
            })
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.isLoading} color="#0096aa" underlayColor='rgba(0,0,0,0.25)'/>
        <Status />
        <View style={styles.whitespace}>
          <View style={styles.divide}>
            <Text style={styles.title}>เบอร์มือถือ:</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Ex. 092xxxxxxx"
              underlineColorAndroid="rgba(255,255,255,0)"
              onChange={(e) => this.setState({phone_number: e.nativeEvent.text})}
              value={this.state.phone_number}
              />
          </View>
          <View style={styles.divide}>
            <Text style={styles.title}>จำนวนเงิน:</Text>
              <Picker
                selectedValue={this.state.amount_topup}
                onValueChange={(amount_topup) => this.setState({amount_topup})}>
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="100" value="100" />
                  <Picker.Item label="150" value="150" />
                  <Picker.Item label="200" value="200" />
                  <Picker.Item label="250" value="250" />
                  <Picker.Item label="300" value="300" />
                  <Picker.Item label="350" value="350" />
                  <Picker.Item label="400" value="400" />
                  <Picker.Item label="450" value="450" />
                  <Picker.Item label="500" value="500" />
                  <Picker.Item label="800" value="800" />
                  <Picker.Item label="1500" value="1500" />
              </Picker>
          </View>
          <View style={[styles.divide, {borderBottomWidth: 0}]}>
            <Text style={styles.title}>ระบบเครือข่าย:</Text>
              <Picker
                selectedValue={this.state.system}
                onValueChange={(system) => this.setState({system})}>
                  <Picker.Item label="AIS" value="AIS" />
                  <Picker.Item label="DTAC" value="DTAC" />
                  <Picker.Item label="TrueMove" value="TrueMove" />
              </Picker>
          </View>
        </View>
        <View style={styles.btn_group}>
            <View style={styles.buttons}>
              <Button
                style={[styles.btn_reset, styles.btn]}
                fontStyle={styles.btn_font_reset}
                text="รีเซ็ต"
                onFocus="#c0392b"
                onPress={() => reset(this)}
                />
                <Button
                  style={[styles.btn_ok, styles.btn]}
                  fontStyle={styles.btn_font_ok}
                  text="เติมเงิน"
                  onFocus="#2c3e50"
                  onPress={() => this.finish()}
                  />
            </View>
        </View>
        <Bottom navigator={this.props.navigator} />
      </View>
    )
  }
}



export default Topup;
