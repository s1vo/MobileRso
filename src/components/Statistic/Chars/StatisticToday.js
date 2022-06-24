import { View, Text , StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart} from 'react-native-chart-kit';

const StatisticToday = () => {
    
    const [count_expired,setExpired] = useState(null);
    const [count_less,setLess] = useState(null);
    const [count_work,setWork] = useState(null);
    const [count_new,setNew] = useState(null);
    const [onLoading, setLoading] = useState(true);

    const [userLogin, setUserLogin] = useState(''); 
    const getUserLogin = async () => {
        try {
            return await AsyncStorage.getItem('login')
        } catch(e) {

        }
    }
    getUserLogin().then(login =>  setUserLogin(login));

    const answerAPI = (response) => {
        
        if(response.status === '200'){
            let dataAnswer = response.message;  
            setExpired(Number(dataAnswer.count_expired));
            setLess(Number(dataAnswer.count_less));
            setWork(Number(dataAnswer.count_work));
            setNew(Number(dataAnswer.count_new));
            setLoading(!onLoading);
        } 
    }

    const getStatic = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
              'login': userLogin,
              'get_statistic_rso_today': 1,
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
            name: 'Новые',
            population: count_new,
            color: '#B4C6D0',
            legendFontColor: '#032A49',
            legendFontSize: 14,
        },
        {
            name: 'В работе',
            population: count_work,
            color: '#1B78AF',
            legendFontColor: 'black',
            legendFontSize: 14,
        },
        {
            name: 'Менее 5 д.',
            population: count_less,
            color: '#e8a93f',
            legendFontColor: 'black',
            legendFontSize: 14,
        },
        {
            name: 'Просрочка',
            population: count_expired,
            color: '#F58E41',
            legendFontColor: 'black',
            legendFontSize: 13,
        }
    ]; 


  return (
    <View style={{backgroundColor:'white'}}>
        { onLoading ? ( <ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center', height:'100%'}}/> ) : (
            <>
                <Text style={styles.header}> Статистика на сегодня </Text>
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
        )}

    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10,
        paddingTop: 15,

    }
    
    //
});

export default StatisticToday