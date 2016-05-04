import React, {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
   flex: 1,
   marginTop: 60
 },
 card: {
   backgroundColor: '#fff',
   padding: 25,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
   flexDirection: 'row'
 },
 left: {
   flex: 0.1
 },
 right: {
   flex: 0.9
 },
 icon: {
   color: '#ddd',
   paddingLeft: 15,
   fontSize: 20
 }
})

export default styles
