import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';

const CardRequest = (props) => {
    
    let renderCard= [];
    function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
            ampm = 'AM',
            time;
    
        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }
    
        // ie: 2014-03-24, 3:00 PM
        time = dd + '-' + mm + '-'+ yyyy + ' '+ h +':' + min 
        return time;
    }
    const apiJson = props.data;
 
    const index = props.index;
    
    for (let i = 0; i  < index; i++) {

        let data = apiJson[0][i];
        
        let claimCreate = convertTimestamp(data.date_part);
    
        let deadlineParse = new Date(data.deadlineDate);
        let yearDeadLine= deadlineParse.getFullYear();
        let mounthDeadLine = deadlineParse.getMonth()
        if (mounthDeadLine < 10){
            mounthDeadLine = '0' + deadlineParse.getMonth();
        }
        let dayDeadLine = deadlineParse.getDate();
        if(deadlineParse.getDate()<10){
            dayDeadLine = '0'+ deadlineParse.getDate()
        }
        let deadlineDate =  dayDeadLine + '-' + mounthDeadLine+ '-' + yearDeadLine 
        

        let dateArhiv= convertTimestamp(data.date_arhiv);
        
        renderCard.push(
            <View key={i}>
            <View style={styles.cardHeader}>
                <Text style={{ fontWeight: '600', color: 'white' }}> Заявка {data.customClaimNumber}</Text>
            </View>
            <View style={styles.cardBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Номер заявки: </Text>
                    <Text style={styles.cardText}>{data.id_tu_object}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Кадастровый номер: </Text>
                    <Text style={styles.cardText}>{data.num_kadastr}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Дата заявки: </Text>
                    <Text style={styles.cardText}>{ claimCreate }</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Срок ответа: </Text>
                    <Text style={styles.cardText}>{(deadlineDate ? deadlineDate :"Данное поле пустое")}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Дата отправки: </Text>
                    <Text style={styles.cardText}>{(dateArhiv ? dateArhiv : "Данное поле пустое")}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Наименование услуги: </Text>
                    <Text style={styles.cardText}>{data.name_rus}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                    <Text style={styles.cardTextHeader}> Статус: </Text>
                    <Text style={styles.cardText}>{data.name}</Text>
                </View>
                <View>
                    <Text style={styles.cardTextHeader}> Заявитель: </Text>
                    <Text style={styles.cardText}>{(data.zayavitel?data.zayavitel: data.zayavitel_name)}</Text>
                </View>
                <View>
                    <Text style={styles.cardTextHeader}> Объект: </Text>
                    <Text style={styles.cardText}>{(data.naznachenie ? data.naznachenie: 'Поле не заполнено')}</Text>
                </View>
            </View>
        </View>
        );

        
    }

    return (
        <>
         {renderCard}
        </>
       
        
    )
}

export default CardRequest

const styles = StyleSheet.create({
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
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 5
    },

})