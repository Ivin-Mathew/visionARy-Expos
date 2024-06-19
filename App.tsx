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
  Viro3DObject,
  ViroAmbientLight,
} from '@reactvision/react-viro';
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InitialScene = (props)=>{
  let data = props.sceneNavigator.viroAppProps;
  
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
      />

      <ViroBox
      height={2} length={2} width={2}
      scale={[0.2,0.2,0.2]}
      position={[0,-1,-1]}
      materials={['dirt']}
      animation={{name:'rotate', loop:true, run:true}}
      /> */}
      <ViroAmbientLight color="#ffffff" />
      {data.object === 'skull' ?
        <Viro3DObject
          source={require('./assets/skull/12140_Skull_v3_L2.obj')}
          position={[0,-3,-4]}
          scale={[0.04,0.04,0.04]}
          rotation={[-90,0,0]}
          type="OBJ"
        /> :
        <Viro3DObject
          source={require('./assets/tv/smartTV.obj')}
          position={[0,-0.5,-3]}
          scale={[0.8,0.8,0.8]}
          rotation={[0,0,0]}
          type="OBJ"
        />
      }
    </ViroARScene>
  );
};


export default () => {
  const [object,setObject] = useState('skull');

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene:InitialScene,
        }}
        viroAppProps={{'object':object}}
        style={{flex:1}}
      />


      <View style={styles.controlsView}>
        <TouchableOpacity onPress={()=>setObject('skull')}>
          <Text style={styles.text}>
            Display Skull
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setObject('tv')}>
          <Text style={styles.text}>
            Display TV
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
