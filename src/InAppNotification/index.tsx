import React, { createRef, useEffect, useState } from 'react';
import { LargeToast, PopUp, SmallToast } from './Containers';
import useNotificationHandler from './Hooks/useNotificationHandler';
import NotificationPopup, {
  type ContentOptionsBase,
} from 'react-native-push-notification-popup';
import type { GBNotification, NotificationTypes } from './types';
interface Props {
  onCloseFunction?: () => void;
  notification: GBNotification;
}

const InAppNotification = ({ notification }: Props) => {
  const smallToastRef = createRef<NotificationPopup>();
  const [shouldShowMessage, setShouldShowMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const showSmallToast = (options: ContentOptionsBase) => {
    smallToastRef.current?.show(options);
  };
  const onCloseFunction = () => setIsVisible(false);

  let { handleMessage } = useNotificationHandler({
    notification,
    showSmallToast: showSmallToast,
  });

  useEffect(() => {
    if (notification) {
      if (notification.isMsg) {
        (async () => {
          setShouldShowMessage(await handleMessage(notification));
        })();
      }
      if (notification.type !== 'Small Toast') {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const renderPopUp = () => {
    return (
      <PopUp
        isVisible={isVisible}
        onCloseFunction={onCloseFunction}
        notification={notification}
      />
    );
  };

  const renderSmallToast = () => {
    return <SmallToast ref={smallToastRef} />;
  };

  const renderLargeToast = () => {
    return (
      <LargeToast
        isVisible={isVisible}
        onCloseFunction={onCloseFunction}
        notification={notification}
      />
    );
  };
  const renderBasedOnType = () => {
    let type: NotificationTypes = notification?.type ?? '';
    switch (type) {
      case 'Small Toast':
        return renderSmallToast();
      case 'Large Toast':
        return renderLargeToast();
      case 'Popup':
        return renderPopUp();
      default:
        return null;
    }
  };

  const renderView = () => {
    if (notification?.isMsg && !shouldShowMessage) {
      return null;
    } else {
      return renderBasedOnType();
    }
  };
  return renderView();
};

export default InAppNotification;
