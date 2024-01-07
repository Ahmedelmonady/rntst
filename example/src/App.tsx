import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InAppNotification } from 'react-native-gameball';
import { AuthScreen, FullScreenWidget, ModalWidgetScreen } from './screens';

import WidgetInitialization from './screens/WidgetInitialization';
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
  return (
    <>
      <AppNav />
      {/* notification data to be passed here */}
      <InAppNotification notification={null} />
    </>
  );
};

export default App;
