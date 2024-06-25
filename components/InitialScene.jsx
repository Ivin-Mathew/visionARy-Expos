/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
} from '@reactvision/react-viro';



const InitialScene = ({clear})=>{
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [rotation,setRotation] = useState([-170, 0, 0]);
  const [position, setPosition] = useState([0,0,-5]);
  const [scale,setScale] = useState([0.01, 0.01, 0.01]);
  const [isVisible, setIsVisible] = useState(true);

  ViroARTrackingTargets.createTargets({
    skullImage:{
      source:require('../assets/skull/Skull.jpg'),
      orientation:'Up',
      physicalWidth:0.165,

    },
  });

  useEffect(() => {
    if (clear) {
      setIsVisible(false);
    }
  }, [clear]);

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
    <ViroARScene>
      {isVisible && (
        <ViroARImageMarker target="skullImage" onAnchorFound={anchorFound}>
          <ViroAmbientLight color="#ffffff" />
          {isMarkerDetected && (
            <Viro3DObject
              source={require('../assets/skull/12140_Skull_v3_L2.obj')}
              scale={[scale[0], scale[1], scale[2]]}
              rotation={[rotation[0], rotation[1], rotation[2]]}
              type="OBJ"
              onLoadStart={() => console.log('Loading 3D object...')}
              onLoadEnd={() => console.log('3D object loaded.')}
              onRotate={rotateObject}
              onPinch={scaleObject}
            />
          )}
        </ViroARImageMarker>
      )}
    </ViroARScene>
  );
};

export default InitialScene;
