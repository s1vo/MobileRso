import { View,  StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { HStack} from "native-base";

import StatisticToday from './Chars/StatisticToday';

const Statistic = () => {   

  return (
    <View style={{marginTop: 10}}>
        <ScrollView  horizontal={true} style={styles.slider}> 
            <HStack space={1}>
                <StatisticToday />
            </HStack>
        </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
    slider: {
        backgroundColor: '#c5c5e599',
        padding: 10,
        borderRadius: 5
    },
});

export default Statistic

