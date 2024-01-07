import React from 'react';
import styles from './styles';
import {
  View,
  Text,
  Modal as FullModal,
  Image,
  TouchableOpacity,
} from 'react-native';

interface Props {
  isVisible: boolean;
  onCloseFunction: () => void;
  notification: any;
}

const PopUp = ({ isVisible, onCloseFunction, notification }: Props) => {
  return (
    <FullModal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        <View style={styles.closeIconContainer}>
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
        <View style={styles.notificationDataCont}>
          <Image
            source={{ uri: notification.icon }}
            style={styles.notificationIconStyle}
          />
          <Text style={styles.notificationTitleStyle}>
            {notification.title}
          </Text>
          <Text style={styles.notificationTitleStyle}>{notification.body}</Text>
        </View>
      </View>
    </FullModal>
  );
};

export default PopUp;
