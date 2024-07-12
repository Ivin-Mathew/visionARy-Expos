/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import Slider from '@react-native-community/slider';
import InitialScene from './InitialScene';

const ViewAR = () => {
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(0.005);

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{ scene: InitialScene }}
        style={{ flex: 1 }}
        viroAppProps={{ rotationY, scale }}
        autofocus={true}
      />
      <Slider
        style={styles.rotationSlider}
        minimumValue={-360}
        maximumValue={360}
        value={rotationY}
        onValueChange={(value) => setRotationY(value)}
        step={1}
      />
      <Slider
        style={styles.scaleSlider}
        minimumValue={0.0005}
        maximumValue={0.03}
        value={scale}
        onValueChange={(value) => setScale(value)}
        step={0.0005}
        orientation="vertical"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  rotationSlider: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
  },
  scaleSlider: {
    position: 'absolute',
    right: -150,
    top: 50,
    bottom: 50,
    width: 350,
    transform:[{rotate:'270deg'}],

  },
});

export default ViewAR;
