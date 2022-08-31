import React from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';

import BillCards from './BillCard';

import colors from '../utils/colors.json';

const TabBills = props => {
    return (
        <ScrollView style={{padding:15, width:'100%', height:'100%'}}>
            {props.showBusy ? 
            <View>
                <ActivityIndicator size={50} color={colors.lightBlue} style={{padding:15}}/> 
            </View>
            : props.bills.map( (elem, index) => {
                const bill = elem._data;
                const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const expDate = new Date(bill.expirationDate.toDate()).toLocaleDateString("it-IT", optionsDate);
                const currentDate = new Date().setHours(0,0,0,0);
                const expDateString = bill.expirationDate.toDate() >= currentDate ? 'Scade ' + expDate : 'Scaduta ' + expDate;
                return (
                    <BillCards key={index} companyName={bill.companyName} billPrice={bill.totalAmount + ' €'} expirationDate={expDateString} onPress={props.onPress} bill={bill} billID={elem.id}/>
                )
            })
        }
        </ScrollView>
    )
}

export default TabBills;