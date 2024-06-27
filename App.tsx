/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewAR from './components/ViewAR';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AR view"
          component={ViewAR}
          options={{title:'AR view'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

