/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFile } from './FileContext';
import RNFS from 'react-native-fs';

const FileUploader = () => {
  const { uploadFile, uploadMTLFile, uploadImages, uploadMarker, file, mtlFile, images, marker } = useFile();
  const [uploadedObjName, setUploadedObjName] = useState('');
  const [uploadedMtlName, setUploadedMtlName] = useState('');
  const [uploadedImagesNames, setUploadedImagesNames] = useState('');
  const [uploadedMarkerName, setUploadedMarkerName] = useState('');

  useEffect(() => {
    if (file) { setUploadedObjName(file.name); }
    if (mtlFile) { setUploadedMtlName(mtlFile.name); }
    if (images && images.length > 0) { setUploadedImagesNames(images.map(img => img.name).join(', ')); }
    if (marker) { setUploadedMarkerName(marker.fileName || marker.name); }
  }, [file, mtlFile, images, marker]);

  const saveFile = async (uri, fileName) => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(uri, path);
      return `file://${path}`;
    } catch (error) {
      console.error('Error saving file:', error);
      return null;
    }
  };

  const pickFile = async (fileType) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const file = res[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const filePath = await saveFile(file.uri, file.name);

      if (!filePath) {
        Alert.alert('Error', 'Failed to save the file');
        return;
      }

      switch (fileType) {
        case 'obj':
          if (fileExtension !== 'obj') {
            Alert.alert('Invalid File', 'Please upload a file with .obj extension');
            return;
          }
          await uploadFile({ ...file, uri: filePath });
          setUploadedObjName(file.name);
          break;

        case 'mtl':
          if (fileExtension !== 'mtl') {
            Alert.alert('Invalid File', 'Please upload a file with .mtl extension');
            return;
          }
          await uploadMTLFile({ ...file, uri: filePath });
          setUploadedMtlName(file.name);
          break;

        case 'images':
          const images = res.filter((img) => {
            const ext = img.name.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png'].includes(ext);
          });
          if (images.length === 0) {
            Alert.alert('Invalid Files', 'Please upload image files with jpg, jpeg, or png extensions');
            return;
          }
          const savedImages = await Promise.all(images.map(img => saveFile(img.uri, img.name)));
          await uploadImages(savedImages.map((uri, index) => ({ ...images[index], uri })));
          setUploadedImagesNames(images.map(img => img.name).join(', '));
          break;

        default:
          Alert.alert('Invalid File Type', 'Unsupported file type');
          return;
      }

      Alert.alert('Success', 'File uploaded successfully');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('No File Selected', 'File upload has been cancelled');
      } else {
        Alert.alert('Error', 'Failed to upload the file');
        console.error(err);
      }
    }
  };

  const pickMarkerImage = () => {
    Alert.alert(
      'Select Image Source',
      'Choose an option',
      [
        {
          text: 'Capture Image',
          onPress: () => captureImage(),
        },
        {
          text: 'Select from Gallery',
          onPress: () => selectImage(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const captureImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'Image capture cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const { assets } = response;
          if (assets && assets.length > 0) {
            const filePath = await saveFile(assets[0].uri, assets[0].fileName);
            if (!filePath) {
              Alert.alert('Error', 'Failed to save the marker image');
              return;
            }
            await uploadMarker({ ...assets[0], uri: filePath });
            setUploadedMarkerName(assets[0].fileName);
            Alert.alert('Success', 'Marker image uploaded successfully');
          }
        }
      }
    );
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'Image selection cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const { assets } = response;
          if (assets && assets.length > 0) {
            const filePath = await saveFile(assets[0].uri, assets[0].fileName);
            if (!filePath) {
              Alert.alert('Error', 'Failed to save the marker image');
              return;
            }
            await uploadMarker({ ...assets[0], uri: filePath });
            setUploadedMarkerName(assets[0].fileName);
            Alert.alert('Success', 'Marker image uploaded successfully');
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/uploadBG.jpg')} style={styles.backgroundImage}>
        <View style={styles.container1}>
          <Text style={styles.title}>Upload files</Text>
          <TouchableOpacity style={styles.button} onPress={() => pickFile('obj')}>
            <Text style={styles.text}>Upload .obj File</Text>
          </TouchableOpacity>
          {uploadedObjName && <Text style={styles.fileName}>Uploaded file: {uploadedObjName}</Text>}

          <TouchableOpacity style={styles.button} onPress={() => pickFile('mtl')}>
            <Text style={styles.text}>Upload .mtl File</Text>
          </TouchableOpacity>
          {uploadedMtlName && <Text style={styles.fileName}>Uploaded file: {uploadedMtlName}</Text>}

          <TouchableOpacity style={styles.button} onPress={() => pickFile('images')}>
            <Text style={styles.text}>Upload Images</Text>
          </TouchableOpacity>
          {uploadedImagesNames && <Text style={styles.fileName}>Uploaded files: {uploadedImagesNames}</Text>}

          <TouchableOpacity style={styles.button} onPress={pickMarkerImage}>
            <Text style={styles.text}>Capture or Select Marker Image</Text>
          </TouchableOpacity>
          {uploadedMarkerName && <Text style={styles.fileName}>Uploaded image: {uploadedMarkerName}</Text>}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent: 'space-around',
  },
  container1: {
    flex:1,
    alignContent: 'space-around',
    padding:20,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#0079ff',
    padding: 10,
    borderRadius:10,
    borderColor:'#000000',
    borderWidth:2,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: 'Arial',
    textAlign: 'center',
    padding: 10,
    paddingBottom:20 ,
    borderRadius: 5,
  },
  fileName: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop:-20,
  },
});

export default FileUploader;
