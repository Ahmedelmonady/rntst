import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import GameballApp, { type GameballConfig } from '../../../src';

const SimpleGameballApp = () => {
  const showToast = async () => {
    const gbapp = GameballApp.getInstance()

    const config: GameballConfig = {
      apiKey :"c2bbedacfff94672b2032e9ee0efda54",
      language: "en"
    };

    // await gbapp.init(config);

    // const customer: CustomerRegistrationRequest = {
    //   customerId: "rn-01"
    // }

    // gbapp.registerCustomer(customer)

    Alert.alert('Toast X', 'Button clicked!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Simple App</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={showToast}
        >
          <Text style={styles.buttonText}>Show Toast</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SimpleGameballApp;