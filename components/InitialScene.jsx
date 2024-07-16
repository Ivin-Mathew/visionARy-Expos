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

const InitialScene = (props) => {
  const { file, mtlFile, images, marker } = useFile();
  const [fileUri, setFileUri] = useState(null);
  const [mtlFileUri, setMtlFileUri] = useState(null);
  const [imageUris, setImageUris] = useState([]);
  const [isObjectLoaded, setIsObjectLoaded] = useState(false);

  const rotationX = props.arSceneNavigator.viroAppProps.rotationX;
  const rotationY = props.arSceneNavigator.viroAppProps.rotationY;
  const scale = props.arSceneNavigator.viroAppProps.scale;
  const isVisible = props.arSceneNavigator.viroAppProps.isVisible;
  const isMarkerDetected = props.arSceneNavigator.viroAppProps.isMarkerDetected;
  const anchorFound = props.arSceneNavigator.viroAppProps.anchorFound;

  useEffect(() => {
    if (marker && !isObjectLoaded) {
      ViroARTrackingTargets.createTargets({
        markerTarget: {
          source: { uri: marker.uri },
          orientation: 'Up',
          physicalWidth: 0.1,
        },
      });
      console.log('Marker target created with URI:', marker.uri);
    }
  }, [marker, isObjectLoaded]);

  useEffect(() => {
    if (file) { setFileUri(file.uri); console.log('Resolved OBJ file URI:', file.uri); }
    if (mtlFile) { setMtlFileUri(mtlFile.uri); console.log('Resolved MTL file URI:', mtlFile.uri); }
    if (images) {
      const uris = images.map(img => img.uri);
      setImageUris(uris);
      console.log('Resolved Image file URIs:', uris.join(', '));
    }
  }, [file, mtlFile, images]);


  useEffect(() => {
    console.log('Rotation Y:', rotationY);
    console.log('Scale:', scale);
  }, [rotationY, scale]);

  return (
      <ViroARScene>
        {isVisible && marker && (
          <ViroARImageMarker target="markerTarget" onAnchorFound={anchorFound}>
            <ViroAmbientLight color="#ffffff" />
            {isMarkerDetected && fileUri && (
              <Viro3DObject
                source={{ uri: fileUri }}
                resources={[
                  { uri: mtlFileUri },
                  ...imageUris.map((uri) => ({ uri })),
                ]}
                scale={[scale, scale, scale]}
                rotation={[rotationX , rotationY, 0]}
                type="OBJ"
                onLoadStart={() => console.log('Loading 3D object...')}
                onLoadEnd={() => console.log('3D object loaded successfully.')}
                onError={(event) => console.log('Error loading 3D object:', event.nativeEvent)}
              />
            )}
          </ViroARImageMarker>
        )}
      </ViroARScene>
  );
};

export default InitialScene;
