/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
  ViroARTrackingTargets,
} from '@reactvision/react-viro';
import { useFile } from './FileContext';

const InitialScene = ({ clear }) => {
  const { file, mtlFile, images, marker } = useFile();
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [rotation, setRotation] = useState([-90, 0, 0]);
  const [position, setPosition] = useState([0, 0, -5]);
  const [scale, setScale] = useState([0.005, 0.005, 0.005]);
  const [isVisible, setIsVisible] = useState(true);
  const [fileUri, setFileUri] = useState(null);
  const [mtlFileUri, setMtlFileUri] = useState(null);
  const [imageUris, setImageUris] = useState([]);

  useEffect(() => {
    if (clear) {
      setIsVisible(false);
    }
  }, [clear]);

  useEffect(() => {
    if (marker) {
      ViroARTrackingTargets.createTargets({
        markerTarget: {
          source: { uri: marker.uri },
          orientation: 'Up',
          physicalWidth: 0.165,
        },
      });
      console.log('Marker target created with URI:', marker.uri);
    }
  }, [marker]);

  useEffect(() => {
    if (file) { setFileUri(file.uri); console.log('Resolved OBJ file URI:', file.uri); }
    if (mtlFile) { setMtlFileUri(mtlFile.uri); console.log('Resolved MTL file URI:', mtlFile.uri); }
    if (images) { 
      const uris = images.map(img => img.uri);
      setImageUris(uris);
      console.log('Resolved Image file URIs:', uris.join(', '));
    }
  }, [file, mtlFile, images]);

  const anchorFound = () => {
    setIsMarkerDetected(true);
    console.log('Marker detected');
  };

  const moveObject = (newPosition) => {
    setPosition(newPosition);
  };

  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 3) {
      let newRotation = rotation.map((angle) => angle - rotationFactor);
      setRotation(newRotation);
    }
  };

  const scaleObject = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      let newScale = scale.map((dim) => dim * scaleFactor);
      setScale(newScale);
    }
  };

  return (
    <ViroARScene>
      {isVisible && marker && (
        <ViroARImageMarker target="markerTarget" onAnchorFound={anchorFound}>
          <ViroAmbientLight color="#ffffff" />
          {isMarkerDetected && fileUri && mtlFileUri && (
            <Viro3DObject
              source={{ uri: fileUri }}
              resources={[
                { uri: mtlFileUri },
                ...imageUris.map((uri) => ({ uri })),
              ]}
              scale={[scale[0], scale[1], scale[2]]}
              rotation={[rotation[0], rotation[1], rotation[2]]}
              type="OBJ"
              onLoadStart={() => console.log('Loading 3D object...')}
              onLoadEnd={() => console.log('3D object loaded successfully.')}
              onError={(event) => console.log('Error loading 3D object:', event.nativeEvent)}
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
