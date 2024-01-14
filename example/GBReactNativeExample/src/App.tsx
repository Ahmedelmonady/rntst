import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {InAppNotification, type GBNotification} from 'react-native-gameball';
import {AuthScreen, FullScreenWidget, ModalWidgetScreen} from './screens';

import WidgetInitialization from './screens/WidgetInitialization';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export type RootStackParamList = {
  Init: undefined; // No additional parameters for Init screen
  Auth: undefined; // No additional parameters for Auth screen
  Home: undefined; // No additional parameters for Home screen
};
const BottomBarComp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FullWidget" component={FullScreenWidget} />
      <Tab.Screen name="Modal" component={ModalWidgetScreen} />
    </Tab.Navigator>
  );
};

const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Init" component={WidgetInitialization} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={BottomBarComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [notificationData, setNotificationData] =
    useState<null | GBNotification>(null);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.data) {
        setNotificationData(remoteMessage.data as unknown as GBNotification);
      }

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <AppNav />
      <InAppNotification notification={notificationData} />
    </>
  );
};

export default App;
