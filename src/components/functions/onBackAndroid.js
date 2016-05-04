import React, {
  BackAndroid
} from 'react-native'

// รับค่า navigator จาก props ของ Component นั้นๆ
// เพื่อใช้ในการ pop push ออกไปอีกหน้านึง
export default function(navigator) {
  BackAndroid.addEventListener('hardwareBackPress', (function() {
    navigator.pop();
    return true
  }).bind(this));
}
