/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroBox,
} from '@reactvision/react-viro';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const InitialScene = ()=>{
  return (
    <ViroARScene>
      <ViroText
        text={'Hello world!'}
        position={[0,0,-1]} //position of text
        style={{fontSize: 30, fontFamily:'Arial',color:'red'}}
      />
    </ViroARScene>
  )
}


export default () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene:InitialScene
      }}
      style={{flex:1}}
    />
  );
};

var styles = StyleSheet.create({

});
