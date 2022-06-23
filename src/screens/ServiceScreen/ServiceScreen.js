import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import ServiceChars from '../../components/Statistic/Chars/ServiceChars'

const ServiceScreen = () => {
    
  return (
    <View style={styles.root}>
        <Text style={styles.title}>Статистика по услугам</Text>
        <ServiceChars/>
    </View>
  )
}

export default ServiceScreen

const styles = StyleSheet.create({
    root:{
        paddingTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%'
    }, 
    title : { 
        fontSize: 18,
        fontWeight: '600'
    }

})