export type NotificationTypes = 'Small Toast' | 'Large Toast' | 'Popup';
export type GBNotification = {
  type: NotificationTypes;
  isMsg?: boolean;
  frequency: number;
  icon: string;
  title: string;
  body: string;
  msgId: string;
};
