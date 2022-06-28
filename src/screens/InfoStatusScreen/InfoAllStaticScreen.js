import { View, Text , StyleSheet,ScrollView} from 'react-native';
import React,{useState}from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HStack, NativeBaseProvider} from "native-base";

import StatisticGPZU from '../../components/Statistic/AllStatic/StatisticGPZU'; 
import StatisticTU from '../../components/Statistic/AllStatic/StatisticTU';
import StatisticDP from '../../components/Statistic/AllStatic/StatisticDP';
import StatisticACT from '../../components/Statistic/AllStatic/StatisticACT';
import StatisticSITP from '../../components/Statistic/AllStatic/StatisticSITP';
import StatisticSPD from '../../components/Statistic/AllStatic/StatisticSPD';
import StatisticSRD from '../../components/Statistic/AllStatic/StatisticSRD';
import StatisticInfoTU from '../../components/Statistic/AllStatic/StatisticInfoTU';
import NetInfo from "@react-native-community/netinfo";
import Networking from '../../components/Networking/Networking';

const InfoAllStaticScreen = () => {

  const [onNetwork, setNetWork] = useState(false);
  NetInfo.fetch().then(state => {
      setNetWork(state.isConnected);
  });
  const navigation = useNavigation();
  const backScreen =()=>  {
    navigation.navigate('HomeScreen');
  }
  if(onNetwork){
    return (
      <NativeBaseProvider >
        <View>
          <ScrollView vertical={true} style={styles.slider}> 
            <StatisticGPZU/>
            <StatisticTU/>
            <StatisticDP/>
            <StatisticACT/>
            <StatisticSITP/>
            <StatisticSPD/>
            <StatisticSRD/>
            <StatisticInfoTU/>
          </ScrollView>
          <View style={styles.footer}>
                <CustomButton text="Назад" onPress={backScreen} />
          </View>
        </View>
  
      </NativeBaseProvider>
    )
  }else{
    return(
      <Networking></Networking>
    )
  }

}

export default InfoAllStaticScreen


const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#c5c5e599',
    padding: 20,
    borderRadius: 5,
    height:'90%',
    paddingTop: Platform.OS === 'android' ? 40 : 10
  },
  wrapper:{
    backgroundColor: '#c5c5e599',
  },
  footer:{
    marginTop: 10,
    marginHorizontal: '5%',
    backgroundColor:'white'
  }


});