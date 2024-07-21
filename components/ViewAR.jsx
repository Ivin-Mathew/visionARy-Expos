/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import Slider from '@react-native-community/slider';
import InitialScene from './InitialScene';

const ViewAR = () => {
  const [rotationX, setRotationX] = useState(-90);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(0.005);
  const [isVisible, setIsVisible] = useState(true);
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);

  const anchorFound = () => {
    setIsMarkerDetected(true);
    setIsVisible(true);
    console.log('Marker detected');
  };

  // Convert linear slider value to non-linear scale
  const convertToNonLinearScale = (linearValue) => {
    // Example conversion using exponential mapping
    // Adjust the base value as needed to fit your specific range and control
    const nonLinearScale = Math.pow(10, linearValue);
    return nonLinearScale;
  };

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{ scene: InitialScene }}
        style={{ flex: 1 }}
        viroAppProps={{ rotationX, rotationY, scale, isVisible, isMarkerDetected, anchorFound }}
        autofocus={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => { setIsVisible(false); setIsMarkerDetected(false); }}>
        <Text>Remove models</Text>
      </TouchableOpacity>
      <Slider
        style={styles.rotationSliderY}
        minimumValue={-360}
        maximumValue={360}
        value={rotationY}
        onValueChange={(value) => setRotationY(value)}
        step={1}
      />
      <Slider
        style={styles.rotationSliderX}
        minimumValue={-360}
        maximumValue={360}
        value={rotationX}
        onValueChange={(value) => setRotationX(value)}
        step={22.5}
      />
      <Slider
        style={styles.scaleSlider}
        minimumValue={-5} // Adjusted for exponential mapping
        maximumValue={-0.5} // Adjusted for exponential mapping, corresponds to ~0.008
        value={Math.log10(scale)} // Convert current scale to linear slider value
        onValueChange={(linearValue) => setScale(convertToNonLinearScale(linearValue))}
        step={0.00001} // Adjust step for finer control
        orientation="vertical"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  rotationSliderX: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
  },
  rotationSliderY: {
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
  button: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    right: 10,
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ViewAR;
