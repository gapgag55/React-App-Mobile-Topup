import React, {
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  row: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  head: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headTitle: {
    fontWeight: 'bold',
  },
  status_success: {
    color: '#2980b9'
  },
  status_conducted: {
    color: '#f39c12'
  },
  status_fail: {
    color: '#c0392b'
  },
  body: {
    paddingHorizontal: 15
  },
  subrow: {
    paddingVertical: 5,
    flexDirection: 'row'
  },
  left: {
    flex: 1.5
  },
  title: {
    fontWeight: 'bold',
  },
  right: {
    flex: 3,
    flexWrap: 'wrap',
  },
  bottom: {
    paddingBottom: 15
  }
});

export default styles
