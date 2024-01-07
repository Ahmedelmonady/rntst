import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  closeIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 30,
    marginTop: 30,
    zIndex: 1,
  },
  closeImageStyle: {
    width: 20,
    height: 20,
  },
  notificationDataCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIconStyle: {
    borderRadius: 10,
    width: 140,
    height: 140,
  },
  notificationTitleStyle: {
    paddingTop: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationBodyStyle: {
    marginTop: 8,
    textAlign: 'center',
  },
});
