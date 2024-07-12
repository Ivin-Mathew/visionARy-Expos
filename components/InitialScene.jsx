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
  const [isMarkerDetected, setIsMarkerDetected] = useState(false);
  const [position, setPosition] = useState([0, 0, -5]);
  const [isVisible, setIsVisible] = useState(true);
  const [fileUri, setFileUri] = useState(null);
  const [mtlFileUri, setMtlFileUri] = useState(null);
  const [imageUris, setImageUris] = useState([]);
  const rotationY = props.arSceneNavigator.viroAppProps.rotationY;
  const scale = props.arSceneNavigator.viroAppProps.scale;

  useEffect(() => {
    if (marker) {
      ViroARTrackingTargets.createTargets({
        markerTarget: {
          source: { uri: marker.uri },
          orientation: 'Up',
          physicalWidth: 0.2,
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

  useEffect(() => {
    console.log('Rotation Y:', rotationY);
    console.log('Scale:', scale);
  }, [rotationY, scale]);

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
                scale={[scale, scale, scale]}
                rotation={[-90, rotationY, 0]}
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
