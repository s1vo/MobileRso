import { View, Text , StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PieChart} from 'react-native-chart-kit';

const StatisticDP = () => {
  
  const [onLoading, setLoading] = useState(true);
  const [apiJson, setApiJson] = useState('');
  const [userLogin, setUserLogin] = useState(''); 

  const getUserLogin = async () => {
      try {
          return await AsyncStorage.getItem('login')
      } catch(e) {

      }
  }
  getUserLogin().then(login =>  setUserLogin(login));
  // записываем в State ответ
  const answerAPI =  (response) => {
      if(response.status === '200'){            
          if(typeof(response) === 'object'){
              let objectAPI = response.message[3];
              setApiJson(objectAPI);    
          }
          setLoading(!onLoading);
      }   
  }   

  const getStatic = () => {
      const options = {
          method: 'POST',
          headers: new Headers({
              'login': userLogin,
              'get_statistic': 1,
              'Content-Type': 'application/json'
          }),
      };
      
      fetch('http://mvitu.arki.mosreg.ru/api_mobile_rso/', options)
          .then(response => response.json())
          .then(response => answerAPI(response))
          .catch(err => console.error(err));
  }

  if(onLoading){
      const answer = getStatic();
  }
  
    
  let arrayStat = []; 

  if(apiJson){
    if(apiJson.req_work){
        arrayStat.push({
            name: 'В работе',
            population: Number(apiJson.req_work),
            color: '#1B78AF',
            legendFontColor: 'black',
            legendFontSize: 14,
        })
    }
    if(apiJson.req_otaz){
        arrayStat.push({
            name: 'Отказ',
            population: Number(apiJson.req_otaz),
            color: '#f09732',
            legendFontColor: 'black',
            legendFontSize: 13,
        })
    }
    if(apiJson.req_arhive){
        arrayStat.push({
            name: 'В архиве',
            population: Number(apiJson.req_arhive),
            color: '#cfcfcf',
            legendFontColor: 'black',
            legendFontSize: 13,
        })
    }
}else{
    arrayStat.push({
        name: 'В работе',
        population: 0,
        color: '#1B78AF',
        legendFontColor: 'black',
        legendFontSize: 14,
    })
    arrayStat.push({
        name: 'Отказ',
        population: 0,
        color: '#f09732',
        legendFontColor: 'black',
        legendFontSize: 13,
    })
    arrayStat.push({
        name: 'В архиве',
        population: 0,
        color: '#cfcfcf',
        legendFontColor: 'black',
        legendFontSize: 13,
    })
}

  return (
    <View style={styles.card}>
        { 
            onLoading ? 
            ( <ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center', height:'100%'}}/> ) :
            (<View style={styles.wrapper}>
                <Text style={styles.header}> Статистика ДП </Text>
                <PieChart
                    data={arrayStat}
                    width={Dimensions.get('window').width - 60}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 5,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 5,
                    }}
                    accessor="population"
                    backgroundColor="white"
                    paddingLeft="10" 
                />
                <View style={styles.cardTable}>
                    <View style={styles.cardHeader}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}> Количество заявок</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 5, marginVertical: 5}}>
                            <Text>В работе </Text>
                            <Text>{(apiJson ? apiJson.req_work: 0 )}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 5, marginVertical: 5}}>
                            <Text>Отказано </Text>
                            <Text>{(apiJson ? apiJson.req_otaz: 0 )}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 5, marginVertical: 5}}>
                            <Text>В архиве </Text>
                            <Text>{(apiJson ? apiJson.req_arhive: 0 )}</Text>
                        </View>                        
                    </View>
                </View>

            </View>
            )
        }
    </View>
  )
}


const styles = StyleSheet.create({
    header:{
        fontSize: 16,
        fontWeight: '600',
        
    },
    card:{
        justifyContent:'center',
        backgroundColor:'white',
        padding: 20,
        borderRadius: 5, 
        marginBottom: 15,
    },
    cardHeader: {
        alignItems:'center',
        backgroundColor:'#3C4A79', 
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        padding: 5, 
        marginTop: 10,
    },
    wrapper:{
      
    },
    cardBody:{
        borderColor:'#303a5c',
        borderWidth: 1.5,
        padding: 5, 
        marginBottom: 10,
      
    }
});



export default StatisticDP