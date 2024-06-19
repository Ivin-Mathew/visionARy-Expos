/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
} from '@reactvision/react-viro';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const InitialScene = ()=>{

  ViroMaterials.createMaterials({
    dirt:{
      diffuseTexture:require('./assets/dirt.jpeg'),
    },
  });

  ViroAnimations.registerAnimations({
    rotate:{
      duration:2500,
      properties:{
        rotateY:'+=90',
      },
    },
  });

  return (
    <ViroARScene>
      {/* <ViroText
        text={'Hello world!'}
        position={[0,0,-1]} //position of text
        style={{fontSize: 30, fontFamily:'Arial',color:'red'}}
      /> */}

      <ViroBox
      height={2} length={2} width={2}
      scale={[0.2,0.2,0.2]}
      position={[0,-1,-1]}
      materials={['dirt']}
      animation={{name:'rotate', loop:true, run:true}}
      />
    </ViroARScene>
  );
};


export default () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene:InitialScene,
      }}
      style={{flex:1}}
    />
  );
};

var styles = StyleSheet.create({

});
