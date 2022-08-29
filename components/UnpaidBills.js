import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';

const UnpaidBills = props => {
    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            <Text style={{color:'white'}}>Da Pagare + {props.category}</Text>
        </ScrollView>
    )
}

export default UnpaidBills;