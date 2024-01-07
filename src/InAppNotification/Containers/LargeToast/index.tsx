import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
interface Props {
  isVisible: boolean;
  onCloseFunction: () => void;
  notification: any;
}

const LargeToast = ({ isVisible, onCloseFunction, notification }: Props) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.viewSmallStyle}>
        <View style={styles.closeButtonContainerLT}>
          <TouchableOpacity
            onPress={onCloseFunction}
            hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          >
            <Image
              source={require('../../../Assets/close.png')}
              style={styles.closeImageStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.LTdataContainer}>
          <Image
            source={{ uri: notification.icon }}
            style={styles.LTimageStyle}
          />
          <Text style={styles.LTtitleStyle}>{notification.title}</Text>
          <Text style={styles.LTmessageStyle}>{notification.body}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LargeToast;
