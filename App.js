import React, {useState} from 'react';
import { StyleSheet,SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import { NativeBaseProvider} from "native-base";
import * as Font from 'expo-font';



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#F9FBF',
  },
});
