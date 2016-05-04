import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Alert,
  AsyncStorage,
} from 'react-native';

// CHILD COMPONETNS
import TextInputForm from '../child_page/TextInputForm'
import Button from '../child_page/button'

// CSS
import styles from '../../style/page/transfer'

// NODE_MODULES
import Firebase from 'firebase'

// FIREBASE CONNECT
const tranfer_id = new Firebase('https://mangtopup.firebaseio.com/transfer')
const user_id = new Firebase('https://mangtopup.firebaseio.com/users')

// FUNCTIONS
import commaMoney from '../functions/formatmoney'
import onBackAndroid from '../functions/onBackAndroid'

// VARIABLE
let formatMoney;

class Transfer extends Component {
  constructor(props) {
    super(props)

    // ระบุ State
    // ที่จะส่งไปยังการแจ้งโอนเงินใน Firebase
    this.state = {
      id: 0,
      amount: 0,
      date: '',
      from_bank: '',
      bank: '',
      more: '',
    }
  }

  componentWillMount() {
    // เมื่อ User
    // กดปุ่ม Back บน Android
    onBackAndroid(this.props.navigator)
  }

  send() {
    let { id, amount, date, from_bank, bank, more } = this.state;


    // ถ้า State More เป็นว่างเปล่า
    // ให้เพิ่มเป็น - แทน
    if(more == '') {
      more = '-'
    }

    // ถ้า ไอดี จำนวนที่โอน วันที่
    // และ ธนาคาร ไม่เท่ากับช่องว่าง
    // ให้ทำงานต่อไป
    if(id != '' && amount != '' && date != '' && from_bank != '' && bank != '') {

      // แจ้ง Dialog
      // ยืนยันการแจ้งโอน
      Alert.alert(
        'ยืนยันการโอน',
        'ไอดี: ' + id + '\n' +
        'จำนวน: ' + amount  + '\n' +
        'เวลา: ' + date + '\n' +
        'ชื่อบัญชี: ' + from_bank + '\n' +
        'โอนให้ธนาคาร: ' + bank  + '\n\n' +
        'หมายเหตุ: ' + more,
        [
          {text: 'ยกเลิก'},
          {text: 'ถูกต้อง', onPress: () => {

            AsyncStorage.getItem('key')
              .then(KEY => {

                // แปลง int เป็น String
                // เพื่อส่งไปยัง commaMoney
                amount = amount.toString()

                // METHOD FORMATMONEY
                // Method เปลี่ยนเลข 1000 เป็น 1,000
                formatMoney = commaMoney(amount)

                // สร้าง History_Transfer ใน Key ID นั้นๆ
                // ของ user
                let newTransfer_user = user_id.child(KEY + '/' + 'history_transfer').push()
                newTransfer_user.set({
                  key: newTransfer_user.key(),
                  id: id,
                  amount: formatMoney,
                  date: date,
                  from_bank: from_bank,
                  bank: bank,
                  more: more,
                  // 0 ดำเนินรายการ
                  // 1 สำเร็จ
                  // 2 ล้มเหลว
                  announce: 0,
                })

                // สร้าง Transfer ใน Firebase
                // เพื่อแจ้งเตือน แอดมินว่า
                // ไอดีนี้ส่ง Value แจ้งโอนไปแล้วนะ
                // โดยระบุ key_user เมื่อ admin ทำรายการเรียบร้อย
                // ให้ใช้ key_user หา ID users ใน Firebase
                // แล้ว Update history_transfer (announce)
                // (ใช้ key_historyTransfer_user ค้นหา ID )
                // ว่า "รายการสำเร็จ"
                let newTransfer = tranfer_id.push();
                newTransfer.set({
                  key: newTransfer.key(),
                  key_user: KEY,
                  key_historyTransfer_user: newTransfer_user.key(),
                  id: id,
                  amount: formatMoney,
                  date: date,
                  from_bank: from_bank,
                  bank: bank,
                  more: more
                })

              })

            Alert.alert('เรียบร้อย', 'ขอบคุณสำหรับการแจ้งโอน \nเราจะทำรายการให้ท่านไม่เกิน 30 นาที')
            this.props.navigator.popToTop()
          }},
        ]
      )
    } else {
      Alert.alert('ผิดพลาด', 'โปรดระบุช่องให้ครบ \n (ยกเว้นช่องหมายเหตุ)')
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInputForm
          rowStyle={styles.row}
          leftStyle={styles.left}
          titleStyle={styles.title}
          textTitle="ไอดี: "
          rightStyle={styles.right}
          keyboardType="numeric"
          placeholder="ระบุไอดี (ระบุไอดีของเพื่อนได้)"
          onChange={(e) => { this.setState({ id: e.nativeEvent.text }) }}
          />

       <TextInputForm
         rowStyle={styles.row}
         leftStyle={styles.left}
         titleStyle={styles.title}
         textTitle="จำนวนเงิน: "
         rightStyle={styles.right}
         keyboardType="numeric"
         placeholder="จำนวนเงินที่โอนเข้ามา"
         onChange={(e) => { this.setState({ amount: e.nativeEvent.text }) }}
         />

        <TextInputForm
          rowStyle={styles.row}
          leftStyle={styles.left}
          titleStyle={styles.title}
          textTitle="เวลาที่โอน: "
          rightStyle={styles.right}
          placeholder="12/3/2559 10:20"
          onChange={(e) => { this.setState({ date: e.nativeEvent.text }) }}
          value={this.state.date}
          />

          <TextInputForm
            rowStyle={styles.row}
            leftStyle={styles.left}
            titleStyle={styles.title}
            textTitle="ชื่อบัญชี: "
            rightStyle={styles.right}
            placeholder="นายแดง สีเขียว"
            onChange={(e) => { this.setState({ from_bank: e.nativeEvent.text }) }}
            value={this.state.from_bank}
            />


        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>โอนให้บัญชี: </Text>
          </View>
          <View style={styles.right}>
            <Picker
              selectedValue={this.state.bank}
              onValueChange={(bank) => this.setState({bank})}>
              <Picker.Item label="914-2-02409-5 กสิกร สาขาแม่สอด สรายุทธ หล้าวิไลย์" value="914-2-02409-5 กสิกร สาขาแม่สอด สรายุทธ หล้าวิไลย์" />
              <Picker.Item label="" value="" />
            </Picker>
          </View>
        </View>

        <View style={styles.rowTextArea}>
          <Text style={styles.title}>หมายเลขบัญชีโอนกลับ:</Text>
          <View>
            <TextInput
              style={styles.textArea}
              multiline={true}
              underlineColorAndroid="rgba(255,255,255,0)"
              onChange={(e) => { this.setState({ more: e.nativeEvent.text }) }}
              value={this.state.more}
              placeholder="กรณีไม่สามารถทำรายการให้ท่านได้"/>
          </View>
        </View>

        <View>
          <Button
              style={{backgroundColor: '#34495e', padding: 20, margin: 10}}
              text="แจ้งโอน"
              onFocus="#2c3e50"
              fontStyle={{textAlign: 'center', color: '#fff', fontSize: 15}}
              onPress={() => this.send()}
             />
        </View>

      </View>
    )
  }
}

export default Transfer;
