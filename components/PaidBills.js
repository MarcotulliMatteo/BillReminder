import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';

import PaidBillCards from './PaidBillCard';

const PaidBills = props => {

    const bills = [
        {
            key: 1,
            company: "Enel",
            price: "160 $"
        },
        {
            key: 2,
            company: "Acea",
            price: "180 $"
        },
        {
            key: 3,
            company: "Ferrero",
            price: "40 $"
        }
    ]

    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            {
                bills.map( bill => {
                    return (
                        <PaidBillCards key={bill.key} companyName={bill.company} billPrice={bill.price}/>
                    )
                })
            }
        </ScrollView>
    )
}

export default PaidBills;