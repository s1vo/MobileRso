import { View, Text ,StyleSheet, TouchableOpacity, ScrollView, Image,useWindowDimensions} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Statistic from '../../components/Statistic/Statistic';
import { NativeBaseProvider } from "native-base";
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

import Networking from '../../components/Networking/Networking';

const HomeScreen = () => {

    const navigation = useNavigation();
    const [userName, setUserName] = useState(''); 
    const [onNetwork, setNetWork] = useState(false);
    NetInfo.fetch().then(state => {
        setNetWork(state.isConnected);
    });

    const onExitPressed = () => {
        navigation.navigate('SignInScreen');
    }
    const onGetInfoRso = () => {
        navigation.navigate('InfoRsoScreen');
    }

    const onGetInfoService = () => {
        navigation.navigate('ServiceScreen');
    }

    const onAllStaticScreen = () => {
        navigation.navigate('InfoAllStaticScreen');
    }
    const InfoObjectScreen = () =>{
        navigation.navigate('InfoObjectScreen');
    }

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('user')
        } catch(e) {

        }
    }
    getUserName().then(name =>  setUserName(name));

    if(onNetwork){
        return(
            <NativeBaseProvider>    
                <View style={styles.root}>
                    <Text style={styles.header}> {userName} </Text>
                    <Statistic />
                    <ScrollView style={styles.wrapper}>
                        <TouchableOpacity style={{width:'100%'}} onPress={onGetInfoRso}>
                            <View style={styles.card}>
                                <Text style={styles.itemMenu}> Сведения о РСО</Text>
                            </View>  
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'100%'}} onPress={onAllStaticScreen}>  
                            <View style={styles.card}>
                                <Text style={styles.itemMenu}> Сведения по заявкам </Text>
                            </View>  
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'100%'}} onPress={onGetInfoService}>  
                            <View style={styles.card}>
                                <Text style={styles.itemMenu}> Сведения по услугам </Text>
                            </View>  
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'100%'}} onPress={InfoObjectScreen} >  
                            <View style={styles.card}>
                                <Text style={styles.itemMenu}> Сведения о заявке </Text>
                            </View>  
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{width:'100%'}}>  
                            <View style={styles.card}>
                                <Text style={styles.itemMenu}> История статусов заявке </Text>
                            </View>  
                        </TouchableOpacity> */}
                    </ScrollView>
                
                    <View style={styles.footer}>
                        <CustomButton text="Выйти"  onPress={onExitPressed}/>
                    </View>
                </View>
            </NativeBaseProvider>
    
            
        )
    }else{
        return(
            <Networking/>
        )
    }

}

export default HomeScreen; 

const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
    header:{ 
        fontSize: 17,
        fontWeight: '700',
        color: '#262626',
        marginBottom: 10,
        width: '100%',
    },
    wrapper : {
        marginTop: 15,
        height: '45%'
    }, 
    itemMenu: {
        fontSize: 16,
        fontWeight: '600',  
    },
    footer:{
        marginTop: 10,
    }, 
    card: { 
        borderWidth: 1,
        borderColor: "#DFE1E0",
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },
    logo: {
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
        marginBottom: 30
    },

});