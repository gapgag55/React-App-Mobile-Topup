import React, {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:70,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  rowTextArea: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  left: {
    flex: 2
  },
  title: {
    fontWeight: 'bold',
    marginTop: 17,
    marginLeft: 12
  },
  right: {
    flex: 4
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    padding: 15
  }
})


export default styles
