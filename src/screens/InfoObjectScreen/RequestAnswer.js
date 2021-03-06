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
    const [errorStatus, setErrorStatus] = useState(false);

    const getUserLogin = async () => {
        try {
            return await AsyncStorage.getItem('login')
        } catch(e) {

        }
    }

    getUserLogin().then(login =>  setUserLogin(login));

    const answerAPI =  async(response) => {
  
        if(response.status === '400'){ 
            setErrorStatus(true);
            setErrorText(response.message);
        }else if(response.status === '402'){
            setErrorStatus(true);
            setErrorText(response.message);
        }
        
        if(response.status === '200'){  
          
            if(typeof(response) === 'object'){
                let objectAPI = response.message;
                setApiJson(objectAPI); 
                
                setLoading(!onLoading);  
                setErrorStatus(false);   
            }    
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
    if(!errorStatus){
        return (
            <View style={{marginHorizontal:'5%', marginTop:10,}}>
                { !customClaimNumber ? <Text style={{fontSize:18,fontWeight:'600', marginVertical: '2%'}}> ?????????????? ?????????? ???????????? ?????? ???????????? </Text> : (
                    <ScrollView>
                    { onLoading ? 
                        (<ActivityIndicator size="large" color="#427ef5" style={{flex:1, justifyContent: 'center', height:'100%'}}/>)
                        :
                        (<>
                            <Text style={{marginBottom: 10, fontSize: 16, fontWeight: '600'}}> ?????????????? ???????????? : {sizeRequest} </Text>
                            <CardRequest data={arrayApiJson} index={pageItems}/>
                            {(pageItems !== sizeRequest)? 
                                (<>
                                    <Text  style={{marginBottom: 10, fontSize: 16, fontWeight: '600'}}>?????????????????? {pageItems} ???? {sizeRequest}</Text>
                                    <CustomButton text="?????????????????? ??????" onPress={loadNextPage} /> 
                                </>)
                            :<Text></Text>}
                        </>) 
                    }
                    </ScrollView>
                )}
            </View>
        )
    }else{
        return(
            <View style={{marginHorizontal:'5%', marginTop:10,}}>
                <Text style={{fontSize: 20, fontWeight:'600', color:'red'}}>{errorText}</Text>
            </View>
        )
    }

}

export default RequestAnswer;

const styles = StyleSheet.create({




})