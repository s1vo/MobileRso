import { StyleSheet, Text, View,ScrollView, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardRequest from './CardRequest';
import CustomButton from '../../components/CustomButton/CustomButton';

const RequestAnswer = (props) =>  {
    const customClaimNumber = props.customClaimNumber;
    const onSearch = props.search;
    const [onLoading, setLoading] = useState(onSearch);
    const [apiJson, setApiJson] = useState('');
    const [userLogin, setUserLogin] = useState(''); 
    const [errorText, setErrorText] = useState('');


    const getUserLogin = async () => {
        try {
            return await AsyncStorage.getItem('login')
        } catch(e) {

        }
    }

    getUserLogin().then(login =>  setUserLogin(login));

    const answerAPI =  async(response) => {
        if(response.status === '200'){     
            if(typeof(response) === 'object'){
                let objectAPI = response.message;
                setApiJson(objectAPI); 
                setLoading(!onLoading);   
            }
            
        }   
        else if(response.status === '400'){ 
            //setLoading(false);
            //setErrorText(response.message);
        }
        
    }    

    const getRequest = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
              'login': userLogin,
              'get_info_object': customClaimNumber,
              'Content-Type': 'application/json',
          }),
        };  
        fetch('http://mvitu.arki.mosreg.ru/api_mobile_rso/', options)
          .then(response => response.json())
        .then(response => answerAPI(response))
        .catch(err => console.error(err));
    } 
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    const arrayApiJson = [];
    if(apiJson){
        arrayApiJson.push(apiJson);
    }

    if(onLoading){
        getRequest();
    }


    const sizeRequest = Object.size(apiJson);
    let [pageItems, setPageItems] = useState(1);

    let page = Math.floor(sizeRequest/pageItems);

    const loadNextPage = ()=> {
       let items = pageItems;
       items +=1;
       setPageItems(items);
    }
  
    return (
        <View style={{marginHorizontal:'5%', marginTop:10,}}>
            { !customClaimNumber ? <Text style={{fontSize:18,fontWeight:'600', marginVertical: '2%'}}> Введите номер заявке для поиска </Text> : (
                <ScrollView>
                { errorText ? <Text style={{marginVertical: 5, fontSize: 16, color:"red"}}>{errorText}</Text> : <Text></Text>}
                { onLoading ? 
                    (<ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center', height:'100%'}}/>)
                    :
                    (<>
                        <Text style={{marginBottom: 10, fontSize: 16, fontWeight: '600'}}> Найдено заявок : {sizeRequest} </Text>
                        <CardRequest data={arrayApiJson} index={pageItems}/>
                        {(pageItems !== sizeRequest)? 
                            (<>
                                <Text  style={{marginBottom: 10, fontSize: 16, fontWeight: '600'}}>Загружено {pageItems} из {sizeRequest}</Text>
                                <CustomButton text="Загрузить еще" onPress={loadNextPage} /> 
                            </>)
                        :<Text></Text>}
                    </>) 
                }
                </ScrollView>
            )}

        
        </View>
    )
}

export default RequestAnswer;

const styles = StyleSheet.create({




})