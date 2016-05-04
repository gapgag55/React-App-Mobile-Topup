import React,{
  Component,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'

// CSS
import styles from '../../style/page/howto'

// NODE_MODULES
import Icon from 'react-native-vector-icons/FontAwesome'

// FUNCTIONS
import onBackAndroid from '../functions/onBackAndroid'

class Howto extends Component {

  componentWillMount() {
    // เมื่อ User
    // กดปุ่ม Back บน Android
    onBackAndroid(this.props.navigator)
  }

  render() {
    return (
       <View style={styles.container}>
         <ScrollView>
           <View style={styles.card}>
              <View style={styles.left}>
                <Text>1.</Text>
              </View>
              <View style={styles.right}>
                <Text style={{lineHeight: 24}}>โอนเงินเข้าบัญชี 914-2-02409-5 กสิกรไทย สาขาแม่สอด สรายุทธ หล้าวิไลย์ </Text>
              </View>
           </View>
           <View style={styles.card}>
              <View style={styles.left}>
                <Text>2.</Text>
              </View>
              <View style={styles.right}>
                <Text style={{lineHeight: 24}}>แจ้งการโอนเงินเข้าสู่ระบบโดยไปที่   <Icon
                  name="bars"
                  style={styles.icon} />   (บนมุมด้านซ้ายในหน้าเติมเงิน)</Text>
              </View>
           </View>
           <View style={styles.card}>
              <View style={styles.left}>
                <Text>3.</Text>
              </View>
              <View style={styles.right}>
                <Text style={{lineHeight: 24}}>เมื่อทำการเรียบร้อย เงินจะแสดงบนมุมด้านขวาในหน้าเติมเงิน</Text>
              </View>
           </View>
           <View style={styles.card}>
              <View style={styles.left}>
                <Text>4.</Text>
              </View>
              <View style={styles.right}>
                <Text style={{lineHeight: 24}}>ตรวจสอบสถานะระบบ ถ้าระบบ<Text style={{color: '#0096aa'}}>ออนไลน์</Text>จะเติมเงินได้รวดเร็ว ถ้า<Text style={{color: '#e74c3c'}}>ออฟไลน์</Text>จะเติมเงินช้า {'\n'}เนื่องจากเรามี Admin ตรวจสอบการเติมเงินของแต่ละท่าน</Text>
              </View>
           </View>
           <View style={styles.card}>
              <View style={styles.left}>
                <Text>5.</Text>
              </View>
              <View style={styles.right}>
                <Text style={{lineHeight: 24}}>จากนั้นสามารถเติมเงินได้เลย ระบบจะใช้เวลาทำการไม่เกิน 30 นาทีต่อครั้ง {'\n'}<Text style={{color: '#e74c3c'}}>(โดยจะเสียค่าบริการครั้งละ 2 บาท)</Text></Text>
              </View>
           </View>
         </ScrollView>
       </View>
    )
  }
}

export default Howto;
