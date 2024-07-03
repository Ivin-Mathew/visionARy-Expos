/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
} from '@reactvision/react-viro';

const ARScene = ({ setMarkerDetected, rotation, scale, setScale, isVisible }) => {
  useEffect(() => {
    ViroARTrackingTargets.createTargets({
      skullImage: {
        source: require('../assets/skull/Skull.jpg'),
        orientation: 'Up',
        physicalWidth: 0.165,
      },
      burj: {
        source: require('../assets/marker.jpg'),
        orientation: 'Up',
        physicalWidth: 0.165,
      },
    });
  }, []);

  const anchorFound = () => {
    console.log('Anchor found!');
    setMarkerDetected(true);
  };

  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let newScale = scale.map(dim => dim * scaleFactor);
      setScale(newScale);
    }
  };

  return (
    <ViroARScene>
      {/* {isVisible && (
        <ViroARImageMarker target="burj" onAnchorFound={anchorFound}>
          <ViroAmbientLight color="#ffffff" />
          <Viro3DObject
            source={require('../assets/burj/burj.obj')}
            resources={[require('../assets/burj/burj_khalifa.mtl')]}
            scale={[scale[0], scale[1], scale[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
            type="OBJ"
            onLoadStart={() => console.log('Loading 3D object...')}
            onLoadEnd={() => console.log('3D object loaded.')}
            onPinch={scaleObject}
          />
        </ViroARImageMarker>
      )} */}

      <ViroAmbientLight color="#ffffff" />
      <Viro3DObject
        source={require('../assets/burj/burj.obj')}
        resources={[require('../assets/burj/burj_khalifa.mtl')]}
        scale={[scale[0], scale[1], scale[2]]}
        rotation={[rotation[0], rotation[1], rotation[2]]}
        position={[0,0,-0.25]}
        type="OBJ"
        onLoadStart={() => console.log('Loading 3D object...')}
        onLoadEnd={() => console.log('3D object loaded.')}
        onPinch={scaleObject}
      />
    </ViroARScene>
  );
};

const InitialScene = ({ clear, rotation, scale, setScale, isVisible, setMarkerDetected }) => {
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [localIsVisible, setLocalIsVisible] = useState(true);

  useEffect(() => {
    if (clear) {
      setLocalIsVisible(false);
    }
  }, [clear]);

  useEffect(() => {
    setMarkerDetected(isMarkerDetected);
  }, [isMarkerDetected, setMarkerDetected]);

  return (
    <ARScene
      setMarkerDetected={setIsMarkerDetected}
      rotation={rotation}
      scale={scale}
      setScale={setScale}
      isVisible={isVisible && localIsVisible}
    />
  );
};

export default InitialScene;
