/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFile } from './FileContext';


const FileUploader = () => {
  const { uploadFile, uploadMTLFile, uploadImages, uploadMarker, file, mtlFile, images, marker } = useFile();

  // State for storing uploaded file names
  const [uploadedObjName, setUploadedObjName] = useState('');
  const [uploadedMtlName, setUploadedMtlName] = useState('');
  const [uploadedImagesNames, setUploadedImagesNames] = useState('');
  const [uploadedMarkerName, setUploadedMarkerName] = useState('');

  useEffect(() => {
    if (file) {setUploadedObjName(file.name);}
    if (mtlFile) {setUploadedMtlName(mtlFile.name);}
    if (images && images.length > 0) {setUploadedImagesNames(images.map(img => img.name).join(', '));}
    if (marker) {setUploadedMarkerName(marker.fileName || marker.name);} // Assuming marker object has fileName or name property
  }, [file, mtlFile, images, marker]);

  const pickFile = async (fileType) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const file = res[0];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      switch (fileType) {
        case 'obj':
          if (fileExtension !== 'obj') {
            Alert.alert('Invalid File', 'Please upload a file with .obj extension');
            return;
          }
          uploadFile(file);
          setUploadedObjName(file.name);
          break;

        case 'mtl':
          if (fileExtension !== 'mtl') {
            Alert.alert('Invalid File', 'Please upload a file with .mtl extension');
            return;
          }
          uploadMTLFile(file);
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
          uploadImages(images);
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
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'Image capture cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const { assets } = response;
          if (assets && assets.length > 0) {
            uploadMarker(assets[0]);
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
      (response) => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'Image selection cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          const { assets } = response;
          if (assets && assets.length > 0) {
            uploadMarker(assets[0]);
            setUploadedMarkerName(assets[0].fileName);
            Alert.alert('Success', 'Marker image uploaded successfully');
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload files</Text>
      <TouchableOpacity style={styles.button} onPress={() => pickFile('obj')}>
        <Text style={styles.text}>Upload .obj File</Text>
      </TouchableOpacity>
      {uploadedObjName && <Text style={styles.fileName}>{uploadedObjName}</Text>}

      <TouchableOpacity style={styles.button} onPress={() => pickFile('mtl')}>
        <Text style={styles.text}>Upload .mtl File</Text>
      </TouchableOpacity>
      {uploadedMtlName && <Text style={styles.fileName}>{uploadedMtlName}</Text>}

      <TouchableOpacity style={styles.button} onPress={() => pickFile('images')}>
        <Text style={styles.text}>Upload Images</Text>
      </TouchableOpacity>
      {uploadedImagesNames && <Text style={styles.fileName}>{uploadedImagesNames}</Text>}

      <TouchableOpacity style={styles.button} onPress={pickMarkerImage}>
        <Text style={styles.text}>Capture or Select Marker Image</Text>
      </TouchableOpacity>
      {uploadedMarkerName && <Text style={styles.fileName}>{uploadedMarkerName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignContent: 'space-around',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#0079ff',
    padding: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
  title: {
    color: '#000000',
    fontSize: 48,
    alignSelf: 'center',
    marginBottom: 40,
    fontWeight: '200',
  },
  fileName: {
    color: '#000000',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default FileUploader;
