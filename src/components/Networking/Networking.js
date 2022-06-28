import { View, Text ,StyleSheet, TouchableOpacity, ScrollView, Image,useWindowDimensions} from 'react-native'
import React from 'react'

import WarningImage from '../../../assets/attention.png';

const Networking = () => {
    return (
        <View style={{backgroundColor:'white', flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image  source={WarningImage} style={[styles.logo]} />
            <Text style={{fontSize: 22, fontWeight: '700'}}>Нет подключения к интернету</Text>
        </View>
    )
}

export default Networking

const styles = StyleSheet.create({
    logo: {
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
    },

});