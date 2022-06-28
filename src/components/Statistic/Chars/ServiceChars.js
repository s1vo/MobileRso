import { View, Text , StyleSheet,Dimensions, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceChars = () => {
    
    let arrayStat = []; 

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

    const [userLogin, setUserLogin] = useState(''); 
    const getUserLogin = async () => {
        try {
            return await AsyncStorage.getItem('login')
        } catch(e) {

        }
    }
    getUserLogin().then(login =>  setUserLogin(login));

    const getStatic = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
              'login': userLogin,
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


    if(arrServices.get('ГПЗУ')){
        arrayStat.push(
            {
                name: 'ГПЗУ',
                population: (arrServices.get('ГПЗУ')?arrServices.get('ГПЗУ'):0),
                color: '#B4C6D0',
                legendFontColor: '#032A49',
                legendFontSize: 14,
            }
        );
    }
    if(arrServices.get('ТУ')){
        arrayStat.push(
            {
                name: 'ТУ',
                population: (arrServices.get('ТУ')?arrServices.get('ТУ'):0),
                color: '#1B78AF',
                legendFontColor: 'black',
                legendFontSize: 14,
            }
        );
    }
    if(arrServices.get('ДП')){
        arrayStat.push(
            {
                name: 'ДП',
                population: (arrServices.get('ДП')?arrServices.get('ДП'):0),
                color: '#023859',
                legendFontColor: 'black',
                legendFontSize: 14,
            }
        );
    }
    if(arrServices.get('АКТ')){
        arrayStat.push(
            {
                name: 'АКТ',
                population: (arrServices.get('АКТ')?arrServices.get('АКТ'):0),
                color: '#F58E41',
                legendFontColor: 'black',
                legendFontSize: 13,
            }
        );
    }
    if(arrServices.get('СИТП')){
        arrayStat.push(
            {
                name: 'СИТП',
                population: (arrServices.get('СИТП')?arrServices.get('СПД'):0),
                color: '#305996',
                legendFontColor: 'black',
                legendFontSize: 13,
            }
        );
    }
    if(arrServices.get('СПД')){
        arrayStat.push(
            {
                name: 'СПД',
                population: (arrServices.get('СПД')?arrServices.get('СПД'):0),
                color: '#f54e42',
                legendFontColor: 'black',
                legendFontSize: 13,
            }
        );
    }
    if(arrServices.get('СРД')){
        arrayStat.push(
            {
                name: 'СРД',
                population: (arrServices.get('СРД')?arrServices.get('СРД'):0),
                color: '#88E8F2',
                legendFontColor: 'black',
                legendFontSize: 13,
            }
        );
    }
    if(arrServices.get('Инф.ТУ')){
        arrayStat.push(
            {
                name: 'Инф.ТУ',
                population: (arrServices.get('Инф.ТУ')?arrServices.get('Инф.ТУ'):0),
                color: '#011C40',
                legendFontColor: 'black',
                legendFontSize: 13,
            }
        );
    }

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
                    <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 5, marginVertical: 5, marginHorizontal: '20%'}}>
                        <Text>
                            ГПЗУ
                        </Text>
                        <Text>
                            {(arrServices.get('ГПЗУ') ? arrServices.get('ГПЗУ'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            ТУ
                        </Text>
                        <Text>
                            {(arrServices.get('ТУ') ? arrServices.get('ТУ'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text >
                            ДП
                        </Text>
                        <Text>
                            {(arrServices.get('ДП') ? arrServices.get('ДП'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            АКТ
                        </Text>
                        <Text>
                        {(arrServices.get('АКТ') ? arrServices.get('АКТ'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            СИТП
                        </Text>
                        <Text>
                            {(arrServices.get('СИТП') ? arrServices.get('СИТП'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            СРД
                        </Text>
                        <Text>
                            {(arrServices.get('СРД') ?arrServices.get('СРД'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            СПД
                        </Text>
                        <Text >
                            {(arrServices.get('СПД')?arrServices.get('СПД'):0)} 
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: 5,marginHorizontal: '20%'}}>
                        <Text>
                            Инфо.ТУ
                        </Text>
                        <Text>
                            {(arrServices.get('Инф.ТУ')?arrServices.get('Инф.ТУ'):0)} 
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
        alignItems:'center',
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
        marginTop: '60%',
        marginHorizontal:'5%',

    }

});