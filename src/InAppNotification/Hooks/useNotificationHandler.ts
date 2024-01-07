import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GBNotification } from '../types';

interface Props {
  notification: GBNotification;
  showSmallToast: (data: any) => void;
}
const useNotificationHandler = ({ notification, showSmallToast }: Props) => {
  const handleMessage = async (data: GBNotification) => {
    if (data.frequency < 0) {
      return true;
    } else {
      let count: string | number | null = await AsyncStorage.getItem(
        '' + data.msgId
      );
      if (count) {
        if (parseInt(count) > data.frequency) {
          return false;
        } else {
          count = parseInt(count) + 1;
          await AsyncStorage.setItem('' + data.msgId, '' + count);
          return true;
        }
      } else {
        await AsyncStorage.setItem('' + data.msgId, '' + 1);
        return true;
      }
    }
  };

  const checkWetherToShowNotificationOrNot = async () => {
    if (
      notification.isMsg &&
      notification.frequency > 0 &&
      (await handleMessage(notification)) === false
    ) {
      return;
    } else {
      showSmallToast({
        onPress: function () {},
        appIconSource: notification.icon,
        timeText: 'Now',
        title: notification.title,
        body: notification.body,
        slideOutTime: 5000,
      });
    }
  };

  useEffect(() => {
    if (notification && notification?.type === 'Small Toast') {
      checkWetherToShowNotificationOrNot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  return { handleMessage };
};

export default useNotificationHandler;
