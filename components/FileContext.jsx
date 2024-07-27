/* eslint-disable prettier/prettier */

import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const useFile = () => useContext(FileContext);

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [mtlFile, setMtlFile] = useState(null);
  const [images, setImages] = useState([]);
  const [marker, setMarker] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const uploadFile = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const uploadMTLFile = (uploadedMTLFile) => {
    setMtlFile(uploadedMTLFile);
  };

  const uploadImages = (uploadedImages) => {
    setImages(uploadedImages);
  };

  const uploadMarker = (uploadedMarker) => {
    setMarker(uploadedMarker);
  };
  const removeFile = () => {
    setFile(null);
  };

  const removeMTLFile = () => {
    setMtlFile(null);
  };

  const removeImages = () => {
    setImages([]);
  };

  const removeMarker = () => {
    setMarker(null);
  };
  const setDemoMode = (value) => setIsDemo(value);

  return (
    <FileContext.Provider value={{
      file, uploadFile, removeFile,
      mtlFile, uploadMTLFile, removeMTLFile,
      images, uploadImages, removeImages,
      marker, uploadMarker, removeMarker,
      isDemo, setDemoMode,
    }}>
      {children}
    </FileContext.Provider>
  );
};
