import { View, Text } from 'react-native'
import React from 'react'

const CardTableStatic = () => {

    const [listOfStatic, setListOfMenu] = useState([
        {title: 'ГПЗУ', count: 29,  key: '1' },
        {title: 'ТУ', count: 1038, key: '2'},
        {title: 'Акт',count: 286, key: '3'},
        {title: 'ДП',count: 1165,  key: '4'}, 
        {title: 'СИТП',count: 83,  key: '5'},
        {title: 'СПД',count: 91,  key: '6'}, 
        {title: 'СРД',count: 110,  key: '7'},
        {title: 'Инфо.ТУ',count: 8,  key: '8'}, 
    ]);
    
  return (
    <View>
        <View style={styles.card}>
            <Text style={{fontSize: 17, fontWeight: '800'}}>Стастистика на сейчас</Text>
                <FlatList style={styles.contanier}  data={listOfStatic} renderItem={({item}) => (
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemName}> {item.title}</Text>
                        <Text style={styles.cardItemCount}> {item.count} </Text>
                    </View>
                )}/>
        </View>
        <View style={styles.card}>
            <Text  style={{fontSize: 17, fontWeight: '800'}}>Стастистика по Статусам</Text>
            <FlatList style={styles.contanier}  data={listOfStatic} renderItem={({item}) => (
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemName}> {item.title}</Text>
                        <Text style={styles.cardItemCount}> {item.count} </Text>
                    </View>
                )}/>
        </View>
        <View style={styles.card}>
            <Text  style={{fontSize: 17, fontWeight: '800'}}>Стастистика по заявкам</Text>
            <FlatList style={styles.contanier}  data={listOfStatic} renderItem={({item}) => (
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemName}> {item.title}</Text>
                        <Text style={styles.cardItemCount}> {item.count} </Text>
                    </View>
                )}/>
        </View>
        <View style={styles.card}>
            <Text  style={{fontSize: 17, fontWeight: '800'}} >Стастистика по Услугам</Text>
            <FlatList style={styles.contanier}  data={listOfStatic} renderItem={({item}) => (
                    <View style={styles.cardItem}>
                        <Text style={styles.cardItemName}> {item.title}</Text>
                        <Text style={styles.cardItemCount}> {item.count} </Text>
                    </View>
                )}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    slider: {
        backgroundColor: '#eef9',
        padding: 10
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color : '#262626',
    },
    card : {
        flex: 2, 
        flexWrap: 'wrap',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        height: '100%',
        flexWrap: 'wrap'
   
    },
    contanier: { 
        width: '100%',
        flexGrow: '2',
        flexDirection: 'row',
        marginTop: 10,
    },  
    cardItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: '0.3',
        paddingBottom: 5
        
    },
    cardItemName: {
        fontSize: 16,
        fontWeight: '400',
        marginRight: 100,
    },
    cardItemCount: {
        fontSize: 16,
        fontWeight: '800'
    }
    
    //
});

export default CardTableStatic