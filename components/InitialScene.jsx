/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
  ViroARScene,
  ViroARImageMarker,
  Viro3DObject,
  ViroAmbientLight,
} from '@reactvision/react-viro';
import MarkerContext from './MarkerContext.jsx'; // Adjust the path as necessary

const InitialScene = () => {
  const { isMarkerDetected } = useContext(MarkerContext);

  return (
    <ViroARScene>
      <ViroARImageMarker target="skullImage" onAnchorFound={() => isMarkerDetected(true)}>
        <ViroAmbientLight color="#ffffff" />
        {isMarkerDetected && (
          <Viro3DObject
            source={require('../assets/skull/Skull.jpg')}
            scale={[0.008, 0.008, 0.008]}
            rotation={[-170, 0, 0]}
            type="OBJ"
            onLoadStart={() => console.log('Loading 3D object...')}
            onLoadEnd={() => console.log('3D object loaded.')}
            onError={(error) => console.log('Error loading 3D object:', error)}
          />
        )}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default InitialScene;