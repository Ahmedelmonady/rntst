import React, {createRef, useState} from 'react';
import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';

import {SafeAreaView} from 'react-native';
import {GameballWidget, GameballSDK} from 'react-native-gameball';

const ModalWidget = () => {
  const ref = createRef<GameballWidget>();
  const [hideNavigation, setHideNavigation] = useState(false);
  const [openDetail, setOpenDetail] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <TextInput
        value={openDetail}
        onChangeText={setOpenDetail}
        placeholder="Open detail"
        style={styles.txtInput}
      />
      <View style={styles.hideNavigationSwitchCont}>
        <Text>Hide navigation</Text>
        <Switch value={hideNavigation} onValueChange={setHideNavigation} />
      </View>
      <Button
        title="Send review event"
        onPress={() =>
          GameballSDK.sendEvent({review: {}})
            .then(res => res.json())
            .then(res => console.log(res))
        }
      />
      <Button title="Open modal" onPress={() => ref?.current?.showProfile()} />
      <GameballWidget
        modal={true}
        ref={ref}
        hideNavigation={hideNavigation}
        openDetail={openDetail}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txtInput: {
    borderWidth: 1,
    padding: 10,
    margin: 17,
  },
  hideNavigationSwitchCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
export default ModalWidget;
