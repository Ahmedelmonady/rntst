import React from 'react';
import { SafeAreaView } from 'react-native';
import { GameballWidget } from 'react-native-gameball';

const FullScreenWidget = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GameballWidget />
    </SafeAreaView>
  );
};

export default FullScreenWidget;
