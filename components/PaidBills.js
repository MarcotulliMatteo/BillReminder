import React from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';

import PaidBillCards from './PaidBillCard';

import colors from '../utils/colors.json';

const PaidBills = props => {
    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            {props.showBusy ? 
            <View>
                <ActivityIndicator size={50} color={colors.lightBlue} style={{padding:15}}/> 
            </View>
            : props.bills.map( (elem, index) => {
                const bill = elem._data
                return (
                    <PaidBillCards key={index} companyName={bill.companyName} billPrice={bill.totalAmount + '$'}/>
                )
            })}
        </ScrollView>
    )
}

export default PaidBills;