import React from "react";
import { StyleSheet, View, ScrollView, StatusBar, Text, TextInput, TouchableOpacity} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import Header  from "../components/Header";
import DatePicker from 'react-native-date-picker';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import colors from "../utils/colors.json";

export default class BillDetails extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        bill: null,
        totalAmount: '',
        date: new Date(),
        open: false
    }

    _navBack = () => {
        this.props.navigation.goBack()
    }

    _onChangeTotalAmount = (totalAmount) => {
        const bill = this.state.bill
        bill.totalAmount = totalAmount
        this.setState({'bill': bill})
    }

    _onChangeCompanyName = (companyName) => {
        const bill = this.state.bill
        bill.companyName = companyName
        this.setState({'bill': bill})
    }

    _onChangeExpirationDate = (expDate, open) => {
        const firebaseTimestamp = firestore.Timestamp.fromDate(expDate)
        const bill = this.state.bill
        bill.expirationDate = firebaseTimestamp
        this.setState({'bill': bill, 'open': open})
    }

    _formatDateToRender = () => {
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const expDate = new Date(this.state.bill.expirationDate.toDate()).toLocaleDateString("it-IT", optionsDate);

        return (
            <View>
                <TouchableOpacity onPress={() => {this.setState({'open': true})}}>
                    <Text style={{color:'white', fontSize: 17, textAlign:'right'}}>{expDate.toString()}</Text>
                </TouchableOpacity>
                
                <DatePicker
                    modal
                    open= { this.state.open }
                    date= { new Date(this.state.bill.expirationDate.toDate()) }
                    mode= "date" 
                    onConfirm= {
                        (date) => {
                            this._onChangeExpirationDate(date, false)
                        }
                    }
                    onCancel= {
                        () => {
                            this.setState({'open': false})
                        }
                    }
                />
            </View>
        )
    }

    render() {
        const { bill } = this.props.route.params;
        this.state.bill = bill
        this.state.date = new Date(this.state.bill.expirationDate.toDate())

        return(
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={false} hideRightIcon={true} pageName={'Bill Details'} navBack={this._navBack}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, width:'100%'}}>
                    <ScrollView style={{width: '100%', height:'100%'}} contentContainerStyle={{alignItems:'center', flexDirection:'column'}}>

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 5}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Importo:</Text>
                            </View>
                            <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <TextInput style={{fontSize: 18, backgroundColor:'trasparent', flex:4, color: colors.lightBlue, textAlign:'right'}}
                                    underlineColorAndroid="transparent"
                                    value={this.state.bill.totalAmount}
                                    onChangeText={text => {this._onChangeTotalAmount(text)}}
                                    keyboardType="numeric"/>
                                <Text style={{color: colors.lightBlue, fontSize: 18, flex:1}}> €</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 5}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Nome azienda:</Text>
                            </View>
                            <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center', paddingRight: 20}}>
                                <TextInput style={{fontSize: 18, backgroundColor:'trasparent', flex:4, color: 'white', textAlign:'right'}}
                                    underlineColorAndroid="transparent"
                                    value={this.state.bill.companyName}
                                    onChangeText={text => {this._onChangeCompanyName(text)}}/>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Data scadenza:</Text>
                            </View>
                            <View style={{flex:3, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingRight: 20}}>
                                {this._formatDateToRender()}
                            </View>
                        </View>
                        
                    </ScrollView>
                 </LinearGradient>
            </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
    statusBarStyle: {
        height: getStatusBarHeight()
    }
});