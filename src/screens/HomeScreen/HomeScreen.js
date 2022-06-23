import { View, Text ,StyleSheet, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Statistic from '../../components/Statistic/Statistic';
import { NativeBaseProvider } from "native-base";
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    
    const navigation = useNavigation();
    const [userName, setUserName] = useState(''); 

    const onExitPressed = () => {
        navigation.navigate('SignInScreen');
    }
    const onGetInfoRso = () => {
        navigation.navigate('InfoRsoScreen');
    }

    const onGetInfoService = () => {
        navigation.navigate('ServiceScreen');
    }

    const getUserName = async () => {
        try {
            return await AsyncStorage.getItem('user')
        } catch(e) {

        }
    }

    getUserName().then(name =>  setUserName(name));


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
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Сведения о просрочках </Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}} onPress={onGetInfoService}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Сведения по услугам </Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Сведения по статусам </Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Получение подробных сведений</Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Статистика заявок </Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> Статистика на сейчас</Text>
                        </View>  
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'100%'}}>  
                        <View style={styles.card}>
                            <Text style={styles.itemMenu}> История статусо заявки </Text>
                        </View>  
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.footer}>
                    <CustomButton text="Выйти"  onPress={onExitPressed}/>
                </View>
            </View>
        </NativeBaseProvider>

        
    )
}

export default HomeScreen; 

const styles = StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: 'white'
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
    }

});