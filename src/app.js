import React, {
  AppRegistry,
  Component,
  Text,
  Navigator,
  DrawerLayoutAndroid,
  TouchableHighlight,
  AsyncStorage,
  WebView
} from 'react-native';

// COMPONENT PAGE
import Topup from './components/page/topup'
import Transfer from './components/page/transfer'
import History_transfer from './components/page/history_transfer'
import History_topup from './components/page/history_topup'
import Howto from './components/page/howto'
import Fanpage from './components/page/fanpage'

// COMPONENT CHILD PAGE
import Drawble from './components/child_page/drawable'

// CSS
import styles from './style/app'

// NODE_MODULES
import Icon from 'react-native-vector-icons/FontAwesome'
import Firebase from 'firebase'

// FIREBASE CONNECT
let myFirebaseRef = new Firebase('https://mangtopup.firebaseio.com/users')

// FUNCTIONS
import checkInternet from './components/functions/checkInternet'

class topupmang extends Component {
  constructor(props) {
    super(props);


    this.state = {
      nav: '',
      drawer: '',
      id: 0,

      // โหลดตอนเข้าระบบครั้งแรก
      // ประมวลผลหา ID
      // ถ้าได้แล้วให้ปิดโหลดไป
      isLoading: true
    }
  }


  componentWillMount() {

    // ตรวจดูว่ามี ID ค่าเดิมหรือไม่ (เป็นสมาชิกใหม่หรือเปล่า)
    AsyncStorage.getItem('id')
      .then((value) => {

        // ถ้ายังไม่มี ID ในระบบ
        // ให้สร้างใหม่
        if(value == undefined) {

          // สร้าง Object เปล่าๆ เพื่อจะสร้าง Key แล้ว Save Key
          // ไว้ใน Object ที่สร้างขึ้นมา
          // แล้วให้สร้าง Object User ใน Firebase ก่อน
          let NewUser = myFirebaseRef.push();
          NewUser.set({
            key: NewUser.key(),
            id: 0,
            amount: 0
          });

          // กำหนด Key เพื่อไว้ไปแสดงผลใน Firebase อย่างง่าย
          AsyncStorage.setItem('key', NewUser.key())

          // หาค่า ID พอได้แล้วให้ update ที่ Object ที่สร้างเมื่อกี้
          // จากนั้น set ID ใน Storage
          // ถ้าสร้าง Object ใน function นี้มันจะ loop อินฟินิตี้
          // เราเลยทำวิธีแบบนี้
          myFirebaseRef.once("value")
            .then((snapshot) => {
              let ID = snapshot.numChildren().toString()
              let user = new Firebase('https://mangtopup.firebaseio.com/users/' + NewUser.key())
              user.update({id: ID})

              AsyncStorage.setItem('id', ID)
              this.setState({id: ID, isLoading: false})
            });
        } else {
          // ถ้ามี ID ในระบบแล้ว
          // ให้ set เลย
          this.setState({id: value, isLoading: false})
        }

      })
  }

  renderScenes(route, navigator) {
    switch (route.name) {
      case 'topup':
        return (<Topup navigator={navigator}/>)
      case 'transfer':
        return (<Transfer navigator={navigator} />)
      case 'history_transfer':
        return (<History_transfer navigator={navigator} />)
      case 'history_topup':
        return (<History_topup navigator={navigator} />)
      case 'howto':
        return (<Howto  navigator={navigator} />)
      case 'fanpage':
        return (<Fanpage navigator={navigator}/>)
      default:
        return false;
    }
  }

  routeMapper() {
    return {
      LeftButton: (route, navigator) => {
        switch (route.name) {
          case 'topup':
            return (
                <TouchableHighlight
                  style={styles.menu}
                  underlayColor="#0096aa"
                  onPress={() => {
                  this.setState({nav: this.refs.nav, drawer: this.refs.drawer})
                  this.refs.drawer.openDrawer()
                  }}>
                  <Icon
                    name="bars"
                    style={styles.icon} />
                </TouchableHighlight>
            )

          default:
            return (
              <TouchableHighlight
                style={styles.menu}
                underlayColor="#0096aa"
                onPress={() => navigator.popToTop()} >
                <Icon
                  name="arrow-left"
                  style={styles.icon} />
              </TouchableHighlight>
            );
        }
      },
      RightButton: (route, navigator) => {
        let TEXT;
        if(this.state.isLoading) {
          TEXT = 'โหลด...'
        } else {
          TEXT = 'ID: ' + this.state.id
        }
        return (
           <Text style={styles.actionRight}>{TEXT}</Text>
        )
      },
      Title: (route, navigator) => {
        switch (route.name) {
          case 'topup':
            return (<Text style={styles.actionFont}>เติมเงินออนไลน์</Text>)
          case 'transfer':
            return (<Text style={styles.actionFont}>แจ้งโอนเงินเข้าสู่ระบบ</Text>)
          case 'history_transfer':
            return (<Text style={styles.actionFont}>ประวัติโอนเงินเข้าสู่ระบบ</Text>)
          case 'history_topup':
            return (<Text style={styles.actionFont}>รายการเติมเงินย้อนหลัง</Text>)
          case 'howto':
            return (<Text style={styles.actionFont}>วิธีการใช้งาน</Text>)
          case 'fanpage':
            return (<Text style={styles.actionFont}>ติดตามแฟนเพจ</Text>)
          default:
            return false
        }
      }
    }
  }

  drawable() {
    return <Drawble navigator={this.state.nav} closed={this.state.drawer}/>
  }

  render() {
    // METHOD ตรวจสอบอินเตอร์เน็ต
    // ถ้าไม่มีเน็ต ให้แสดง Alert
    // แล้วเด้งออกแอพ เมื่อ user กดตกลง
    checkInternet();

    return (
        <DrawerLayoutAndroid
          ref={'drawer'}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.drawable.bind(this)} >
          <Navigator
            initialRoute={{name: 'topup'}}
            renderScene={this.renderScenes.bind(this)}
            ref={'nav'}
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={this.routeMapper()}
                style={styles.actionBar} />
            }
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          />
        </DrawerLayoutAndroid>
    );
  }
}

export default topupmang;
