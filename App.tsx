/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewAR from './components/ViewAR';
import Home from './components/Home';
import FileUploader from './components/Upload';
import { FileProvider } from './components/FileContext';
import FAQ from './components/FAQ';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <FileProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title:''}}
          />
          <Stack.Screen
            name="AR view"
            component={ViewAR}
            options={{title:'AR view'}}
          />
          <Stack.Screen
            name="Upload"
            component={FileUploader}
            options={{title:'Upload'}}
          />
          <Stack.Screen
            name="FAQ"
            component={FAQ}
            options={{title:'FAQ'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FileProvider>
  );
};

