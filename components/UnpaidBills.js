import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import PaidBillCards from './PaidBillCard';

import colors from '../utils/colors.json'

const UnpaidBills = props => {
    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            {props.bills.size > 0 ?
                props.bills.map( (elem, index) => {
                    const bill = elem._data
                    return (
                        <PaidBillCards key={index} companyName={bill.companyName} billPrice={bill.totalAmount + '$'}/>
                    )
                })
                :
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{color: colors.darkButton, fontSize: 18}}>Nessuna bolletta trovata</Text>
                </View>
            }
        </ScrollView>
    )
}

export default UnpaidBills;