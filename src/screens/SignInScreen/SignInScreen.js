import { View, Text , Image, StyleSheet, useWindowDimensions,TextInput,ActivityIndicator} from 'react-native'
import React, {useState} from 'react';
import Logo from '../../../assets/logo.webp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

import NetInfo from "@react-native-community/netinfo";

import Networking from '../../components/Networking/Networking';
const SignInScreen = () => {    

  const [onNetwork, setNetWork] = useState(false);
  NetInfo.fetch().then(state => {
      setNetWork(state.isConnected);
  });

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [textError, setTextError] = useState('');
  const [onLoading, setOnLoading] = useState(false);

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  
  const setUserName = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
    } catch(e) {
      
    }
  }
  
  const setUserLogin = async (value) => {
    try {
      await AsyncStorage.setItem('login', value)
    } catch(e) {
      
    }
  }

  const answerAPI = (response) => {
    if(response.status === '200'){
      setUserName(response.user);
      setUserLogin(login);
      navigation.navigate('HomeScreen');
      setOnLoading(onLoading);
      setTextError(null);

    }
    if(response.status === '400'){
      setOnLoading(false);
      setTextError(response.message);
      
    }
  }


  const onAuth = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
          'auth': 0,
          'login': login,
          'password' : password,
          'Content-Type': 'application/json'
      }),
    };
  
    fetch('http://mvitu.arki.mosreg.ru/api_mobile_rso/', options)
      .then(response => response.json())
      .then(response => answerAPI(response))
      .catch(err => console.error(err));
  }


  const onSignInPressed = () => {
    setOnLoading(true);
    const answer = onAuth(); 

    
  }
  
  if(onNetwork){
    return (
      <View style={styles.root}>
  
        <Image  source={Logo} style={[styles.logo, {height: height * 0.3}]} />
        <Text style={styles.textLogo}>Руководители РСО</Text>
        
        <CustomInput 
              placeholder={'Логин'} 
              onChangeText={setLogin}
              setValue={setLogin}  
              name="login" 
        />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            placeholder="Пароль"
            name="password"
            secureTextEntry={true}
          />
        </View>
          { textError ? <Text style={{marginVertical: 5, fontSize: 16, color:"red"}}>{textError}</Text> : <Text></Text>}
          <CustomButton text="Войти" onPress={onSignInPressed}/>
          {onLoading ? 
            ( 
              <View style={{marginTop: 20}}>
                <Text>Идет загрузка</Text>
                <ActivityIndicator size="large" color="#427ef5" style={{marginTop: 20,justifyContent: 'center'}}/>
              </View>
               
            ): (<Text></Text>)}
      </View>
  
    )
  }else{
    return(
      <Networking></Networking>
    )
  }

}

const styles = StyleSheet.create({
    root : {
      flex: 1,
      paddingVertical: '20%',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
      height:'100%',

    },
    logo: {
        width: '40%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30
    },
    textLogo: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',

    },
    textInfo: {
      fontSize: 12,
      marginBottom: 20,
      color: '#6b6b6b'
    },
    container: {
      backgroundColor : 'white',
      width : '100%',
      borderColor : '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
    },
    input : {
        padding: 10
    }
  });

export default SignInScreen