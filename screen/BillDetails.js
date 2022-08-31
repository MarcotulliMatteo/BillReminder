import React from "react";
import { StyleSheet, View, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, ToastAndroid} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

import Header  from "../components/Header";

import firestore from '@react-native-firebase/firestore';

import colors from "../utils/colors.json";
import mockData from "../utils/mockData.json";

export default class BillDetails extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        bill: null,
        open: false,
        billID: null
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

    _onChangeCategory = (category) => {
        const bill = this.state.bill
        bill.category = category
        this.setState({'bill': bill})
    }

    _onChangeNote = (note) => {
        const bill = this.state.bill
        bill.note = note
        this.setState({'bill': bill})
    }

    _onChangeRecurrence = (recurrence) => {
        const bill = this.state.bill
        bill.recurrence = recurrence
        this.setState({'bill': bill})
    }

    _updateFirebase = () => {
        firestore()
        .collection('Bills')
        .doc(this.state.billID)
        .update(this.state.bill)
        .then(() => {
            ToastAndroid.show("Modulo Aggiornato", ToastAndroid.LONG);
            console.log('User updated!');
        }).catch(err => {
            console.error('Uppload information error on Firebase')
        });
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
        const { bill, billID } = this.props.route.params;
        this.state.bill = bill
        this.state.billID = billID

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
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Data scadenza:</Text>
                            </View>
                            <View style={{flex:3, flexDirection:'row', justifyContent:'flex-end', alignItems:'center', paddingRight: 20}}>
                                {this._formatDateToRender()}
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Categoria:</Text>
                            </View>
                            <View style={{flex:3, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                <Picker selectedValue={this.state.bill.category} style={{ width:'100%', color: 'white'}} 
                                    onValueChange={(itemValue, itemIndex) => this._onChangeCategory(itemValue)} dropdownIconColor={'white'}
                                    placeholder={'Seleziona categoria'} placeholderStyle={{ color: '#bfc6ea' }}>
                                        {
                                            mockData.categoryForSelector.map(cat => {
                                                return (
                                                    <Picker.Item label={cat} value={cat} key={cat}/>
                                                )
                                            })
                                        }
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Ripeti:</Text>
                            </View>
                            <View style={{flex:3, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                                <Picker selectedValue={this.state.bill.recurrence} style={{ width:'100%', color: 'white'}} 
                                    onValueChange={(itemValue, itemIndex) => this._onChangeRecurrence(itemValue)} dropdownIconColor={'white'}
                                    placeholder={'Seleziona ricorrenza'} placeholderStyle={{ color: '#bfc6ea' }}>
                                        {
                                            mockData.repeatEvery.map(cat => {
                                                return (
                                                    <Picker.Item label={cat} value={cat} key={cat}/>
                                                )
                                            })
                                        }
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Note:</Text>
                            </View>
                            <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <TextInput style={{fontSize: 18, backgroundColor:'trasparent', flex:4, color: 'white', textAlign:'left'}}
                                    placeholder={this.state.bill.note != '' ? null : 'Inserisci una nota'}
                                    placeholderTextColor={'grey'}
                                    underlineColorAndroid="transparent"
                                    multiline={true}
                                    value={this.state.bill.note}
                                    onChangeText={text => {this._onChangeNote(text)}}/>
                            </View>
                        </View>

                        <TouchableOpacity style={{margin: 15, width: '75%', borderRadius: 5, paddingTop: 20}}
                            onPress={this._updateFirebase}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                            style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                                <Text style={{fontSize: 17, color:'white'}}>
                                    Salva modifiche
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin: 15, width: '75%', borderRadius: 5}}
                            onPress={() => {}}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                            style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                                <Text style={{fontSize: 17, color:'white'}}>
                                    Contrassegna come pagata
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={{margin: 15, width: '75%', borderRadius: 5}}
                            onPress={() => {}}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                            style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                                <Text style={{fontSize: 17, color:'white'}}>
                                    Elimina
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

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