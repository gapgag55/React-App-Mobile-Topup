import React, {
  StyleSheet
} from 'react-native'

styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
  },
  whitespace: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginTop: 15,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: 'bold'
  },
  divide: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  btn_group: {
    marginHorizontal: 15
  },
  buttons: {
    flexDirection: 'row',
  },
  btn: {
    padding: 10,
    paddingVertical: 20
  },
  btn_reset: {
    backgroundColor: '#e74c3c',
    flex: 1
  },
  btn_font_reset: {
    color: '#fff',
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  btn_ok: {
    backgroundColor: '#34495e',
    flex: 1
  },
  btn_font_ok: {
    color: '#fff',
    textAlign: 'center'
  }
})

export default styles
