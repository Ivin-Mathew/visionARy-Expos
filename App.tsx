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

const InitialScene = (props)=>{
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [rotation,setRotation] = useState([-170, 0, 0]);
  const [position, setPosition] = useState([0,0,-5]);
  const [scale,setScale] = useState([0.08, 0.08, 0.08]);


  /* ViroMaterials.createMaterials({
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
  }); */

  ViroARTrackingTargets.createTargets({
    skullImage:{
      source:require('./assets/skull/Skull.jpg'),
      orientation:'Up',
      physicalWidth:0.165,

    },
  });
  const anchorFound = () => {
    setIsMarkerDetected(true);
  };

  const moveObject = (newPosition) =>{
    setPosition(newPosition);
  };

  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) { 
      let newRotation = rotation.map(angle => angle - rotationFactor);
      setRotation(newRotation);
    }
  };

  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let newScale = scale.map(dim => dim * scaleFactor);
      setScale(newScale);
    }
  };


  return (
    <ViroARScene >
      {/* <ViroARImageMarker target="skullImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color="#ffffff" />
        {isMarkerDetected && (
          <Viro3DObject
            source={require('./assets/skull/12140_Skull_v3_L2.obj')}
            scale={scale}
            rotation={rotation}
            type="OBJ"
            onLoadStart={() => console.log('Loading 3D object...')}
            onLoadEnd={() => console.log('3D object loaded.')}
            onRotate={rotateObject}
            onPinch={scaleObject}
          />
        )}
      </ViroARImageMarker> */}
      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject
        source={require('./assets/skull/12140_Skull_v3_L2.obj')}
        position={[position[0],position[1],position[2]]}
        scale={[scale[0], scale[1], scale[2]]}
        rotation={[rotation[0], rotation[1], rotation[2]]}
        type="OBJ"
        onLoadStart={() => console.log('Loading 3D object...')}
        onLoadEnd={() => console.log('3D object loaded.')}
        onDrag={moveObject}
        onRotate={rotateObject}
        onPinch={scaleObject}
      />
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
        viroAppProps={{'object':'skull'}}
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
