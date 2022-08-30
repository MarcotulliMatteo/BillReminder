import React from 'react';
import {ScrollView, ActivityIndicator} from 'react-native';

import PaidBillCards from './PaidBillCard';

import colors from '../utils/colors.json';

const PaidBills = props => {
    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            {
                props.bills.map( (elem, index) => {
                    const bill = elem._data
                    return (
                        <PaidBillCards key={index} companyName={bill.companyName} billPrice={bill.totalAmount + '$'}/>
                    )
                })
            }
            {props.showBusy ? <ActivityIndicator size={50} color={colors.lightBlue} style={{padding:15}}/> : null}
        </ScrollView>
    )
}

export default PaidBills;