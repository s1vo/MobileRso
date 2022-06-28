import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import RequestAnswer from './RequestAnswer'
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Networking from '../../components/Networking/Networking';

const InfoObjectScreen = () => {

  const [request, setRequest] = useState('');
  const [searchReq, setSearchReq] = useState('');
  const [onSearch, setOnSearch] = useState(false);

  const [onNetwork, setNetWork] = useState(false);
  NetInfo.fetch().then(state => {
      setNetWork(state.isConnected);
  });

  const backScreen =()=>  {
    navigation.navigate('HomeScreen');
  }

  const navigation = useNavigation();
  
  const SearchPress =()=>{
    setSearchReq(request);
    setOnSearch(!onSearch);

  }
  
  if(onNetwork){
    return (
      <View style={styles.root}>
        <View style={styles.divInput}> 
          <TextInput
              style={styles.input}
              onChangeText={setRequest}
              value={request}
              placeholder="Номер заявке"
          />
          <TouchableOpacity onPress={SearchPress} >
            <View style={styles.searchButton}>
            { onSearch ? (<Text style={styles.textButton}>Сбросить</Text> ): (<Text style={styles.textButton}>Найти</Text>) }
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:'85%'}}>
           { onSearch ? (<RequestAnswer customClaimNumber={searchReq} search={onSearch} />): (<Text></Text>) } 
        </View>
        <View style={styles.footer}>
          <CustomButton text="Назад" onPress={backScreen}/>
        </View>
      </View>
    )
  }else{
    return(
      <Networking></Networking>
    )
  
  }

}

export default InfoObjectScreen

const styles = StyleSheet.create({
  root:{
    backgroundColor:'white',
    height: '97%',
    paddingTop: Platform.OS === 'android' ? 50 : 0
  },
  input : {
    padding: 10,
    width:'77%'
  },
  divInput:{
    flexDirection: 'row',
    justifyContent:'space-between',
    borderColor: '#3C4A79',
    borderWidth: 1.5,
    marginHorizontal: '5%',
    borderRadius: 6,
  },
  searchButton:{
    backgroundColor: '#3C4A79',
    height: 50,
    width: 80,
    alignItems:'center',
    justifyContent:'center'
  },
  textButton: {
    color: 'white',
    fontWeight: '700'
  },
  footer: {
    marginHorizontal: '5%',
    marginTop: '5%'
   
  }

});