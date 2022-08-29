import React from 'react';
import {ScrollView} from 'react-native';

import PaidBillCards from './PaidBillCard';

const UnpaidBills = props => {
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

export default UnpaidBills;