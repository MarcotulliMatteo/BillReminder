import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';

import PaidBillCards from './PaidBillCard';

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
        </ScrollView>
    )
}

export default PaidBills;