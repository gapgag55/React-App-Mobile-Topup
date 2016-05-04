import React, {
  NetInfo,
  BackAndroid,
  Alert
} from 'react-native';

export default function() {
  NetInfo.isConnected.fetch().then(isConnected => {
    if(!isConnected) {
      Alert.alert(
        'ไม่ได้เชื่อมต่ออินเตอร์เน็ต',
        'โปรดเชื่อมต่ออินเตอร์เน็ต \nก่อนการทำรายการทุกครั้ง',
        [{text: 'ตกลง', onPress: () => BackAndroid.exitApp()}]
      )
    }
  })
}
