import { Text, View, StyleSheet, Pressable} from 'react-native'
import React from 'react';

const CustomButton = ({onPress, text}) => {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text} > {text}</Text>
      </Pressable>
    )
  
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#3C4A79',
        width: '100%',
        padding: 15,
        marginVertical : 5, 
        alignItems: 'center',
        borderRadius: 5 

    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
  });

export default CustomButton; 