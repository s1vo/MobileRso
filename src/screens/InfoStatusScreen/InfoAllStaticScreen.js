import { View, Text , StyleSheet,ScrollView} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { HStack, NativeBaseProvider} from "native-base";

import StatisticGPZU from '../../components/Statistic/AllStatic/StatisticGPZU'; 
import StatisticTU from '../../components/Statistic/AllStatic/StatisticTU';
import StatisticDP from '../../components/Statistic/AllStatic/StatisticDP';
import StatisticACT from '../../components/Statistic/AllStatic/StatisticACT';
import StatisticSITP from '../../components/Statistic/AllStatic/StatisticSITP';
import StatisticSPD from '../../components/Statistic/AllStatic/StatisticSPD';
import StatisticSRD from '../../components/Statistic/AllStatic/StatisticSRD';
import StatisticInfoTU from '../../components/Statistic/AllStatic/StatisticInfoTU';

const InfoAllStaticScreen = () => {

  return (
    <NativeBaseProvider>
      <View>
        <ScrollView  horizontal={true} style={styles.slider}> 
          <HStack space={1}>
              <StatisticGPZU/>
              <StatisticTU/>
              <StatisticDP/>
              <StatisticACT/>
              <StatisticSITP/>
              <StatisticSPD/>
              <StatisticSRD/>
              <StatisticInfoTU/>
          </HStack>
        </ScrollView>
      </View>
      <View  style={styles.wrapper}>
          <Text>Table Statistic</Text>
      </View>
    </NativeBaseProvider>
  )
}

export default InfoAllStaticScreen


const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#c5c5e599',
    padding: 10,
    borderRadius: 5
  },
  wrapper:{
    backgroundColor: 'white',
    height: '100%'
  }

});