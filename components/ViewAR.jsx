/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import Slider from '@react-native-community/slider';
import InitialScene from './InitialScene';

const ViewAR = () => {
  const [rotationY, setRotationY] = useState(0);

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{ scene: InitialScene }}
        style={{ flex: 1 }}
        viroAppProps={{ rotationY }}
      />
      <Slider
        style={styles.slider}
        minimumValue={-360}
        maximumValue={360}
        value={rotationY}
        onValueChange={(value) => setRotationY(value)}
        step={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  slider: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
  },
});

export default ViewAR;
