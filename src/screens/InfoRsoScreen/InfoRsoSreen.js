import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import React,{useState}from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

import Networking from '../../components/Networking/Networking';

const InfoRsoScreen = () => {

  const [onNetwork, setNetWork] = useState(false);
  NetInfo.fetch().then(state => {
      setNetWork(state.isConnected);
  });

  const [userName, setUserName] = useState(''); 
  const [onLoading, setLoading] = useState(true);
  const [adress, setAdress] = useState(null);
  const [raion, setRaion] = useState(null);
  const [kadNum, setKadNum] = useState(null);
  const [kadNumTwo, setKadNumTwo] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const [fioRuk, setFioRuk] = useState(null);
  const [dolgRuk, setDolgRuk] = useState(null);


  const [isTs, setIsTs] = useState(null);
  const [isVo, setIsVo] = useState(null);
  const [isHvs, setIsHvs] = useState(null);
  const [isGvs, setIsGvs] = useState(null);
  const [isGs, setIsGs] = useState(null);
  const [isEs, setIsEs] = useState(null);

  const [userLogin, setUserLogin] = useState(''); 

  const getUserLogin = async () => {
    try {
        return await AsyncStorage.getItem('login')
    } catch(e) {

    }
  }

  getUserLogin().then(login =>  setUserLogin(login));
 
  const getUserName = async () => {
    try {
        return await AsyncStorage.getItem('user')
    } catch(e) {

    }
}
getUserName().then(name =>  setUserName(name));

  const answerAPI = (response) => {

    if(response.status === '200'){
      const dataAnswer = response.message;
  
      if(dataAnswer.adress.length > 0){
        setAdress(dataAnswer.adress);
      }else{
        setAdress('Поле не заполнено');
      }
      if(dataAnswer.id_mun_raion.length > 0){
        setRaion(dataAnswer.id_mun_raion);
      }else{
        setRaion('Поле не заполнено');
      }
      if(dataAnswer.kad_num.length > 0){
        setKadNum(dataAnswer.kad_num);
      }else{
        setKadNum('Поле не заполнено');
      }
      if(dataAnswer.kad_num2.length > 0){
        setKadNumTwo(dataAnswer.kad_num2);
      }else{
        setKadNumTwo('Поле не заполнено');
      }
      if(dataAnswer.phone.length > 0){
        setPhone(dataAnswer.phone);
      }else{
        setPhone('Поле не заполнено');
      }
      if(dataAnswer.email.length > 0){
        setEmail(dataAnswer.email);
      }else{
        setEmail('Поле не заполнено');
      }
      if(dataAnswer.fio_ruk.length > 0){
        setFioRuk(dataAnswer.fio_ruk);
      }else{
        setFioRuk('Поле не заполнено');
      }

      if(dataAnswer.dolgn_ruk.length > 0){
        setDolgRuk(dataAnswer.dolgn_ruk);
      }else{
        setDolgRuk('Поле не заполнено');
      }

      if(dataAnswer.is_ts = 1){
        setIsTs('Да');
      }else{
        setIsTs('Нет');
      }
      if(dataAnswer.is_hvs = 1){
        setIsHvs('Да');
      }else{
        setIsHvs('Нет');
      }
      if(dataAnswer.is_gvs = 1){
        setIsGvs('Да');
      }else{
        setIsGvs('Нет');
      }
      if(dataAnswer.is_vo= 1){
        setIsVo('Да');
      }else{
        setIsVo('Нет');
      }
      if(dataAnswer.is_gs= 1){
        setIsGs('Да');
      }else{
        setIsGs('Нет');
      }
      if(dataAnswer.is_es= 1){
        setIsEs('Да');
      }else{
        setIsEs('Нет');
      }
      setLoading(!onLoading);
    }
  }

  const getInfoRso = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
          'login': userLogin,
          'get_info': 'rso',
          'Content-Type': 'application/json'
      }),
    };
    fetch('http://mvitu.arki.mosreg.ru/api_mobile_rso/', options)
      .then(response => response.json())
      .then(response => answerAPI(response))
      .catch(err => console.error(err));
  }



  if(onLoading){
    const answer = getInfoRso();
  }
  const navigation = useNavigation();

  const backScreen =()=>  {
      navigation.navigate('HomeScreen');
  }
  if(onNetwork){
    return (
      <View style={styles.root}>
        {
          onLoading ? ( <ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center'}}/> ) : (
            <><View style={styles.card}>
              <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10, }}>{userName}</Text>
              <View style={styles.cardHeader}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}> Контактная информация</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Адрес: </Text>
                  <Text style={styles.cardText}> {adress} </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Район: </Text>
                  <Text style={styles.cardText}>{raion}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Кадастровый номер №1: </Text>
                  <Text style={styles.cardText}>{kadNum}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Кадастровый номер №2: </Text>
                  <Text style={styles.cardText}>{kadNumTwo}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Телефон: </Text>
                  <Text style={styles.cardText}>{phone}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}> Почта: </Text>
                  <Text style={styles.cardText}>{email}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.cardTextHeader}>{dolgRuk}</Text>
                  <Text style={styles.cardText}>{fioRuk}</Text>
                </View>
              </View>
  
              <View style={styles.cardHeader}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Возможность выдачи ресурсов</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ТС: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isTs}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ВС: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isHvs}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ГВС: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isGvs}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ВО: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isVo}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ЕС: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isEs}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.cardTextHeader}>Возможность выдача ГС: </Text>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginRight: '20%' }}>{isGs}</Text>
                </View>
              </View>
  
  
            </View>
              <View style={styles.footer}>
                <CustomButton text="Назад" onPress={backScreen} />
              </View>
            </>
          )
        }
  
  
      </View>
    )
  }else{
    return (
      <Networking></Networking>
    )
  }

}

export default InfoRsoScreen

const styles = StyleSheet.create({
  root:{
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',  
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    height:'100%'
  },
  cardHeader: {
    alignItems:'center',
    backgroundColor:'#3C4A79', 
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    padding: 5
  }, 
  cardBody:{
    width:'100%',
    borderColor:'#303a5c',
    borderWidth: 1.5,
    padding: 5, 
    marginBottom: 10
  },
  cardTextHeader:{
    fontWeight: '500',
  },
  cardText:{
    fontWeight: '700',
    marginBottom: 5
  },

});