import React, {
  Component,
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native'

// CSS
import styles from '../../style/child_page/history'

// VARIABLE
let status_color = null;
let status_text = '';

class HistoryTopupComponent extends Component {

  componentWillMount() {
    let { announce } = this.props
    // 0 ดำเนินรายการ
    // 1 สำเร็จ
    // 2 ล้มเหลว
    if(announce == 0) {
      status_text = "ดำเนินรายการ"
      status_color = styles.status_conducted
    } else if (announce == 1) {
      status_text = "สำเร็จ"
      status_color = styles.status_success
    } else if (announce == 2){
      status_text = "ล้มเหลว"
      status_color = styles.status_fail
    } else {
      status_text = "ยังไม่มีรายการแจ้งโอน"
      status_color = styles.status_conducted
    }
  }


  render() {
    return (
      <View>
        <View style={styles.row}>
          <View style={[styles.head, {flexDirection: 'row'}]}>
            <View style={{flex: 0.1}}>
              <Text>#{this.props.count}</Text>
            </View>
            <View style={{flex: 0.9}}>
              <Text style={styles.headTitle}>การทำรายการ: <Text style={status_color}>{status_text}</Text></Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.subrow}>
              <View style={styles.left}>
                <Text style={styles.title}>เติมเงินที่เบอร์: </Text>
              </View>
              <View style={styles.right}>
                <Text>{this.props.phone_number}</Text>
              </View>
            </View>
            <View style={styles.subrow}>
              <View style={styles.left}>
                <Text style={styles.title}>จำนวน: </Text>
              </View>
              <View style={styles.right}>
                <Text>{this.props.amount} บาท</Text>
              </View>
            </View>
            <View style={styles.subrow}>
              <View style={styles.left}>
                <Text style={styles.title}>ค่าบริการ: </Text>
              </View>
              <View style={styles.right}>
                <Text>2 บาท</Text>
              </View>
            </View>
            <View style={styles.subrow}>
              <View style={styles.left}>
                <Text style={styles.title}>วันที่เวลา: </Text>
              </View>
              <View style={styles.right}>
                <Text>{this.props.date}</Text>
              </View>
            </View>
            <View style={[styles.subrow, styles.bottom]}>
              <View style={styles.left}>
                <Text style={styles.title}>ยอดคงเหลือ: </Text>
              </View>
              <View style={styles.right}>
                <Text>{this.props.balance} บาท</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default HistoryTopupComponent;
