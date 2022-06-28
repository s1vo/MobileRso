import React,{useState} from 'react';
import { StyleSheet,SafeAreaView} from 'react-native';
import Navigation from './src/navigation';


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
