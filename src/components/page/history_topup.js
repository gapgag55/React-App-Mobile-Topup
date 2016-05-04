import React, {
  View,
  Text,
  Component,
  StyleSheet,
  ListView,
  AsyncStorage
} from 'react-native'

// CHILD_COMPONENTS
import HistoryTopupComponent from '../child_page/history_topup_component'

// CSS
import styles from '../../style/page/history_topup'

// NODE_MODULES
import ProgressBar from 'ProgressBarAndroid'
import Firebase from 'firebase'

// FIREBASE CONNECT
const user_id = new Firebase('https://mangtopup.firebaseio.com/users/')

// FUNCTIONS
import onBackAndroid from '../functions/onBackAndroid'

class History_topup extends Component {
  constructor(props) {
    super(props)

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true
    }
  }


  componentWillMount() {

    // เมื่อ User
    // กดปุ่ม Back บน Android
    onBackAndroid(this.props.navigator)

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    // กำหนด Data
    // เพื่อเก็บค่า Value จาก Firebase
    // ไว้แล้วค่อยโยนใส่ใน ListView
    let DATA = [];

    // ใช้ count เพื่อแสดงตัวเลข
    // ลำดับกล่องการโอน
    let count = 1;

      // หา Key ของ User
      // แล้วเข้าไปที่ history_transfer ของ User
      AsyncStorage.getItem('key')
        .then(KEY => {
          user_id.child(KEY + '/' + 'history_topup').once('value').then(data => {

            // วน Loop เอา Value
            // ไปใส่ใน Array
            // เพื่อให้แสดงผลใน ListView (ListView รับค่าแค่ Array)
            for(var i in data.val()) {
              let box = data.val()[i]

              // box.count คือ เพิ่มเลขกล่อง
              box.count = count;
              DATA.push(box)
              count++
            }

            // ถ้า user เข้าเป็นครั้งแรก
            // หรือไม่มีการโอนเลย
            // ให้ทำกล่องแจ้งไม่มีการโอนแก่ user
            if(DATA.length == 0) {
              this.setState({
                dataSource: ds.cloneWithRows([{
                  count: '0',
                  // 0 ดำเนินรายการ
                  // 1 สำเร็จ
                  // 2 ล้มเหลว
                  // เช็คตอน Loop ใน Component history_transfer_component
                  announce: -1,
                  phone_number: '-',
                  amount: '-',
                  date: '-',
                  balance: '-'
                }]),
                isLoading: false
              });

            // ถ้ามีการแจ้งโอน
            // ให้แสดงกล่องการแจ้งโอนของ user
            } else {
              this.setState({
                // Data ที่ได้จาก Firebase
                // จะเป็นเรียงจากบนลงล่างของ ListView
                // เราก็เลยใช้ reverse กลับหัวมันซะเลยนะแจ้
                // ทีนี้รายการล่าสุดเราจะอยู่ด้านบน

                // และปิด ProgressBar
                dataSource: ds.cloneWithRows(DATA.reverse()),
                isLoading: false
              });
            }

          })

        })
  }

  render() {

    // ถ้า isLoading เป็นจริง
    // (มันจะเป็นจริงก็ต่อเมื่อมันเข้ามาหน้ารายการแจ้งโอน)
    // ให้แสดง ProgressBar นะแจ้
    if(this.state.isLoading) {
      return (
        <View style={[styles.container, styles.loading]}>
          <ProgressBar
            color="#0096aa"
            styleAttr="Inverse"
            />
        </View>
      )

    // ถ้าดาวน์โหลดเสร็จแล้ว
    // ให้ขึ้นโชว์กล่องรายการแจ้งเตือน
    } else {
      return (
        <View style={styles.container}>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(history) =>
              <HistoryTopupComponent
                count={history.count}
                announce={history.announce}
                phone_number={history.phone_number}
                amount={history.amount}
                date={history.date}
                balance={history.balance}
               />
            }
            />
        </View>
      )
    }
  }
}

export default History_topup;
