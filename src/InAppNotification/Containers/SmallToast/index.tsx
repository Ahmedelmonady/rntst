import React from 'react';
import NotificationPopup, {
  type ContentOptionsBase,
} from 'react-native-push-notification-popup';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const SmallToast = React.forwardRef((_props, ref) => {
  const renderCustomPopup = ({
    appIconSource,
    title,
    body,
  }: ContentOptionsBase) => {
    return (
      <View style={styles.customPopUpContainer}>
        <Image
          source={{ uri: appIconSource as string }}
          style={styles.customPopUpImage}
        />
        <View style={styles.customPopUpTextCont}>
          <Text style={styles.customPopTitle}>{title}</Text>
          <Text
            style={styles.customPopDesc}
            ellipsizeMode={'tail'}
            numberOfLines={2}
          >
            {body}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <NotificationPopup
      ref={ref as React.LegacyRef<NotificationPopup>}
      renderPopupContent={renderCustomPopup}
    />
  );
});

export default SmallToast;
