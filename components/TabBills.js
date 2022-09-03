import React from 'react';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import BillCards from './BillCard';

import colors from '../utils/colors.json';

const TabBills = props => {

    const setItemToRender = () => {
        return props.bills.map( (elem, index) => {
            const bill = elem._data;
            const date = new Date(bill.expirationDate.toDate());
            moment.locale('it');
            const expDate = moment(date).format('D MMMM YYYY');
            const currentDate = new Date().setHours(0,0,0,0);
            const expDateString = bill.expirationDate.toDate() >= currentDate ? 'Scade ' + expDate : 'Scaduta ' + expDate;
            
            return (
                <BillCards key={index} companyName={bill.companyName} billPrice={bill.totalAmount + ' €'} 
                 expirationDate={expDateString} onPress={props.onPress} bill={bill} billID={elem.id} isExpired={bill.expirationDate.toDate() >= currentDate ? false : true}/>
            )
        })
    }

    return (
        <View style={{width:'100%', height:'100%'}}>
            <ScrollView style={{width:'100%', height:'100%', padding: 15}}>
                {props.showBusy ? 
                <View>
                    <ActivityIndicator size={50} color={colors.lightBlue} style={{padding:15}}/> 
                </View>
                : setItemToRender()
                }
                <View style={{paddingBottom: 30}}/>
            </ScrollView>
            <View style={{padding:135}}/>
        </View>
        
    )
}

export default TabBills;