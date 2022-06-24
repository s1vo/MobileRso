import { View, Text , StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';


const StatisticSITP = () => {

  const [onLoading, setLoading] = useState(true);
  const [apiJson, setApiJson] = useState('');
  // записываем в State ответ
  const answerAPI =  (response) => {
      if(response.status === '200'){            
          if(typeof(response) === 'object'){
              let objectAPI = response.message[4];
              setApiJson(objectAPI);    
          }
          setLoading(!onLoading);
      }   
  }   

  const getStatic = () => {
      const options = {
          method: 'POST',
          headers: new Headers({
              'login': '7730052050',
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
  
  let arrayStat = [        
      {
          name: 'В работе',
          population: Number(apiJson.req_work),
          color: '#1B78AF',
          legendFontColor: 'black',
          legendFontSize: 14,
      },
      {
          name: 'Отказ',
          population: Number(apiJson.req_otaz),
          color: '#f09732',
          legendFontColor: 'black',
          legendFontSize: 13,
      },
      {
          name: 'В архиве',
          population: Number(apiJson.req_arhive),
          color: '#cfcfcf',
          legendFontColor: 'black',
          legendFontSize: 13,
      }
  ]; 

  return (
    <View style={styles.card}>
        { 
            onLoading ? 
            ( <ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center', height:'100%'}}/> ) :
            (<>
                <Text style={styles.header}> Статистика СИТП </Text>
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
            </>
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
    backgroundColor:'white',
    padding: 20,
    borderRadius: 5
  }

});

export default StatisticSITP