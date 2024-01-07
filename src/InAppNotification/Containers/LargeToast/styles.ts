import { Dimensions, StyleSheet } from 'react-native';
const { height } = Dimensions.get('screen');

export default StyleSheet.create({
  viewSmallStyle: {
    height: height / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  closeButtonContainerLT: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 14,
    marginTop: 14,
  },
  closeImageStyle: {
    width: 20,
    height: 20,
  },
  LTdataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LTimageStyle: {
    borderRadius: 10,
    width: 140,
    height: 140,
  },
  LTtitleStyle: {
    paddingTop: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  LTmessageStyle: {
    marginTop: 8,
    textAlign: 'center',
  },
});
