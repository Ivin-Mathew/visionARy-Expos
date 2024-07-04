/* eslint-disable prettier/prettier */

import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [mtlFile, setMTLFile] = useState(null);
  const [images, setImages] = useState([]);
  const [marker, setMarker] = useState(null);

  const uploadFile = (newFile) => {
    setFile(newFile);
  };

  const uploadMTLFile = (newFile) => {
    setMTLFile(newFile);
  };

  const uploadImages = (newImages) => {
    setImages(newImages);
  };

  const uploadMarker = (newMarker) => {
    setMarker(newMarker);
  };

  return (
    <FileContext.Provider value={{ file, mtlFile, images, marker, uploadFile, uploadMTLFile, uploadImages, uploadMarker }}>
      {children}
    </FileContext.Provider>
  );
};
