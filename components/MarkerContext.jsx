/* eslint-disable prettier/prettier */
import React from 'react';

const MarkerContext = React.createContext({
  isMarkerDetected: false,
  setIsMarkerDetected: () => {},
});

export default MarkerContext;
