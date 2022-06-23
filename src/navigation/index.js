import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoRsoScreen from '../screens/InfoRsoScreen';
import ServiceScreen from '../screens/ServiceScreen/ServiceScreen';
import InfoObjectScreen from '../screens/InfoObjectScreen/InfoObjectScreen';

const Stack = createNativeStackNavigator();
//
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="SignInScreen" component={SignInScreen} /> 
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="InfoRsoScreen" component={InfoRsoScreen} /> 
            <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
            <Stack.Screen name="InfoObjectScreen" component={InfoObjectScreen} /> 
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation