import { View, Text , StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';


const ServiceChars = () => {
  
    const [onLoading, setLoading] = useState(true);
    const [services,setServices] = useState('');

    // записываем в State ответ
    const answerAPI = (response) => {
        if(response.status === '200'){            
            setServices({dataAnswer: response.message})
            setLoading(!onLoading);
        } 
    }   
    // записываем в ассоциативный массив (для удобного обращения через ключи)
    const parseDataJson = (services) => {
        let arrServices = new Map();
        if(typeof(services) === 'object'){
            services.dataAnswer.forEach((item)=>{
                arrServices.set(item.name_rus,Number(item.count))
            })
        }
        return arrServices; 
    }

    const getStatic = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
              'login': '7730052050',
              'get_info': 'service',
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

    const arrServices = parseDataJson(services);
    let arrayStat = [        
        {
            name: 'ГПЗУ',
            population: arrServices.get('ГПЗУ'),
            color: '#B4C6D0',
            legendFontColor: '#032A49',
            legendFontSize: 14,
        },
        {
            name: 'ТУ',
            population: arrServices.get('ТУ'),
            color: '#1B78AF',
            legendFontColor: 'black',
            legendFontSize: 14,
        },
        {
            name: 'ДП',
            population: arrServices.get('ДП'),
            color: '#023859',
            legendFontColor: 'black',
            legendFontSize: 14,
        },
        {
            name: 'АКТ',
            population: arrServices.get('АКТ'),
            color: '#F58E41',
            legendFontColor: 'black',
            legendFontSize: 13,
        },
        {
            name: 'СИТП',
            population: arrServices.get('СИТП'),
            color: '#305996',
            legendFontColor: 'black',
            legendFontSize: 13,
        },
        {
            name: 'СПД',
            population: arrServices.get('СПД'),
            color: '#f54e42',
            legendFontColor: 'black',
            legendFontSize: 13,
        },
        {
            name: 'СРД',
            population: arrServices.get('СРД'),
            color: '#88E8F2',
            legendFontColor: 'black',
            legendFontSize: 13,
        },
        {
            name: 'Инф.ТУ',
            population: arrServices.get('Инф.ТУ'),
            color: '#011C40',
            legendFontColor: 'black',
            legendFontSize: 13,
        }
    ]; 

    const navigation = useNavigation();

    const backScreen =()=>  {
        navigation.navigate('HomeScreen');
    }
  return (
    <View style={styles.wrapper}>
        { onLoading ? ( <ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center'}}/> ) : 
            (   
                <View style={styles.root}>
                <PieChart 
                    data={arrayStat}
                    width={Dimensions.get('window').width}
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
                <View style={styles.cardHeader}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}> Количество заявок </Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5, marginVertical: 5}}>
                        <Text>
                            ГПЗУ
                        </Text>
                        <Text>
                            {arrServices.get('ГПЗУ')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            ТУ
                        </Text>
                        <Text>
                            {arrServices.get('ТУ')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            ДП
                        </Text>
                        <Text>
                            {arrServices.get('ДП')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            АКТ
                        </Text>
                        <Text>
                            {arrServices.get('АКТ')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            СИТП
                        </Text>
                        <Text>
                            {arrServices.get('СИТП')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            СРД
                        </Text>
                        <Text>
                            {arrServices.get('СРД')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            СПД
                        </Text>
                        <Text>
                            {arrServices.get('СПД')}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom: 5}}>
                        <Text>
                            Инфо.ТУ
                        </Text>
                        <Text>
                            {arrServices.get('Инф.ТУ')}
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <CustomButton text="Назад" onPress={backScreen}/>
                </View>
                </View>
            )
        } 


    </View>

  )
}

export default ServiceChars;

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent: 'space-between', 
        marginHorizontal: '5%',
        alignItems:'center'
    },  
    root:{
        marginHorizontal: '5%',
        padding: 20
    },
    cardHeader: {
      alignItems:'center',
      backgroundColor:'#3C4A79', 
      borderTopStartRadius: 5,
      borderTopEndRadius: 5,
      padding: 5, 
      marginHorizontal: '5%',
      marginTop: 10,
    }, 
    cardBody:{

      borderColor:'#303a5c',
      borderWidth: 1.5,
      padding: 5, 
      marginBottom: 10,
      marginHorizontal: '5%'
    },
    cardTextHeader:{
      fontWeight: '500',
    },
    cardText:{
      fontWeight: '700',
      marginBottom: 5
    },
    footer:{
        marginTop: '70%',
        marginHorizontal:'5%',

    }

});