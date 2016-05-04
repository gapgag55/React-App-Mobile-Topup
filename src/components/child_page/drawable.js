import React, {
  View,
  Text,
  ListView,
  Component,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

// CSS
import styles from '../../style/child_page/drawable'

// NODE_MODULES
import Icon from 'react-native-vector-icons/FontAwesome'

let menus;

class Drawable extends Component {
  constructor(props) {
    super(props)

    menus = [{
        text: 'แจ้งโอนเงินเข้าสู่ระบบ',
        push_name: 'transfer',
        icon_font: <Icon name="credit-card" style={styles.icon}/>
    }, {
        text: 'ประวัติการโอนเงินเข้าระบบ',
        push_name: 'history_transfer',
        icon_font: <Icon name="history" style={styles.icon}/>
    }, {
        text: 'รายการเติมเงินย้อนหลัง',
        push_name: 'history_topup',
        icon_font: <Icon name="money" style={styles.icon}/>
    }, {
        text: 'วิธีการใช้งาน',
        push_name: 'howto',
        icon_font: <Icon name="question-circle" style={styles.icon}/>
    }
  ];
  }

  render() {
    let { navigator, closed } = this.props;

    let item = menus.map((menu) => {
      return (
        <TouchableHighlight
          key={menu.text}
          style={styles.listItem}
          underlayColor="#fff"
          onPress={() => {
              navigator.push({name: menu.push_name});
              closed.closeDrawer();
            }
          }>
          <View style={styles.item}>
            <View style={styles.iconFonts}>
              {menu.icon_font}
            </View>
            <View style={styles.text}>
              <Text style={styles.font}>{menu.text}</Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    })

    return (
      <View style={styles.container}>
        {item}
        <View style={styles.bottom} >
          <Text>Test</Text>
        </View>
      </View>
    )
  }
}

export default Drawable;
