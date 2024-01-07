import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  customPopUpContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  customPopUpImage: {
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  customPopUpTextCont: {
    flex: 1,
    marginLeft: 10,
  },
  customPopTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  customPopDesc: {
    fontSize: 12,
  },
});
