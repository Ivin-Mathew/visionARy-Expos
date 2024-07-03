/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import InitialScene from './InitialScene';

const ViewAR = () => {
  const [rotation, setRotation] = useState([-90, 0, 0]);
  const [scale, setScale] = useState([0.005, 0.005, 0.005]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);

  const rotateLeft = () => {
    setRotation(prevRotation => [prevRotation[0], prevRotation[1], prevRotation[2] - 10]);
  };

  const rotateRight = () => {
    setRotation(prevRotation => [prevRotation[0], prevRotation[1], prevRotation[2] + 10]);
  };

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
          passProps: {
            rotation,
            scale,
            setScale,
            isVisible,
            clear: !isMarkerDetected,
            setMarkerDetected: setIsMarkerDetected,
          },
        }}
        style={{ flex: 1 }}
        autofocus={true}
      />
      <View style={styles.controlsView}>
        <Button title="Rotate Left" onPress={rotateLeft} />
        <Button title="Rotate Right" onPress={rotateRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  controlsView: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    margin: 20,
    backgroundColor: '#9d9d9d',
    padding: 10,
    fontWeight: 'bold',
  },
});

export default ViewAR;
