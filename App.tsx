/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  ViroARScene,
  ViroARSceneNavigator,
/*   ViroMaterials,
  ViroAnimations, */
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,

} from '@reactvision/react-viro';
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InitialScene from './components/InitialScene';



export default () => {
  const [clear,setClear] = useState(false);

  const handleClearObjects = () =>{
    setClear(true);
  };

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene:InitialScene,
        }}
        style={{flex:1}}
        autofocus={true}
        viroAppProps={{ clear: clear }}
      />
      <View style={styles.controlsView}>
        <TouchableOpacity onPress={handleClearObjects}>
          <Text style={styles.text}>
            Clear objects
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView:{
    flex:1,
  },
  controlsView:{
    width:'100%',
    height:100,
    backgroundColor:'#ffffff',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  text:{
    margin:20,
    backgroundColor:'#9d9d9d',
    padding:10,
    fontWeight:'bold',
  },
});
