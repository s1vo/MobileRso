import { StyleSheet, Text, View} from 'react-native'
import React,{useState}from 'react'
import ServiceChars from '../../components/Statistic/Chars/ServiceChars'
import NetInfo from "@react-native-community/netinfo";

import Networking from '../../components/Networking/Networking';

const ServiceScreen = () => {
  const [onNetwork, setNetWork] = useState(false);
  NetInfo.fetch().then(state => {
      setNetWork(state.isConnected);
  });

  if(onNetwork){
    return (
      <View style={styles.root}>
          <Text style={styles.title}>Статистика по услугам</Text>
          <ServiceChars/>
      </View>
    )
  }else{
    return(
      <Networking></Networking>
    )
  }


}

export default ServiceScreen

const styles = StyleSheet.create({
    root:{
      paddingTop: 10,
      backgroundColor: 'white',
      alignItems: 'center',
      height: '100%',
      paddingTop: Platform.OS === 'android' ? 40 : 0
    }, 
    title : { 
        fontSize: 18,
        fontWeight: '600'
    }

})