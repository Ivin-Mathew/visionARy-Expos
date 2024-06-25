/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,

} from '@reactvision/react-viro';
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const InitialScene = (props)=>{
  let data = props.sceneNavigator.viroAppProps;
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);

  ViroARTrackingTargets.createTargets({
    skullImage:{
      source:require('./assets/skull/Skull.jpg'),
      orientation:'Up',
      physicalWidth:0.165,

    },
  });

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


  const anchorFound = () => {
    setIsMarkerDetected(true);
  };


  return (
    <ViroARScene >
      <ViroARImageMarker target="skullImage" onAnchorFound={anchorFound}>
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
        {isMarkerDetected && (
          <Viro3DObject
            source={require('./assets/skull/12140_Skull_v3_L2.obj')}
            scale={[0.008, 0.008, 0.008]}
            rotation={[-170, 0, 0]}
            type="OBJ"
            onLoadStart={() => console.log('Loading 3D object...')}
            onLoadEnd={() => console.log('3D object loaded.')}
            onError={(error) => console.log('Error loading 3D object:', error)}
          />
        )}
        {/* {data.object === 'skull' ?
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
        } */}
      </ViroARImageMarker>
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
        autofocus={true}
      />


      <View style={styles.controlsView}>
        <TouchableOpacity onPress={()=>setObject('skull')}>
          <Text style={styles.text}>
            Clear objects
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
