import React from "react";
import { StyleSheet, View, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, ToastAndroid} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

import Header  from "../components/Header";
import BillDetailsButtons from "../components/BillDetailsButtons";

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
        billID: null,
        canModify: false,
        isNewBill: false
    }

    componentDidMount = () => {
        this.setState({'canModify': this.state.isNewBill})
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
            this._navBack()
            ToastAndroid.show("Modulo Aggiornato", ToastAndroid.LONG);
            console.log('Bill updated!');
        }).catch(err => {
            console.error('Uppload information error on Firebase')
        });
    }

    _setPaidBill = () => {
        firestore()
        .collection('Bills')
        .doc(this.state.billID)
        .update({
            paid: true
        })
        .then(() => {
            this._navBack()
            ToastAndroid.show("Modulo Pagato", ToastAndroid.LONG);
            console.log('Bill Paid!');
        }).catch(err => {
            console.error('Uppload information error on Firebase')
        });
    }

    _deleteBill = () => {
        firestore()
        .collection('Bills')
        .doc(this.state.billID)
        .delete()
        .then(() => {
            this._navBack()
            ToastAndroid.show("Modulo Cancellato", ToastAndroid.LONG);
            console.log('Bill deleted!');
        }).catch(err => {
            console.error('Delete information error on Firebase')
        });
    }

    _insertFirebase = (bill) => {
        firestore()
        .collection('Bills')
        .add(bill)
        .then(() => {
            this._navBack()
            ToastAndroid.show("Modulo Creato", ToastAndroid.LONG);
            console.log('Bill added!');
        }).catch(err => {
            console.error('Insert information error on Firebase')
        });
    }

    _formatDateToRender = () => {
        const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const expDate = new Date(this.state.bill.expirationDate.toDate()).toLocaleDateString("it-IT", optionsDate);

        return (
            <View>
                <TouchableOpacity onPress={() => {
                    this.state.canModify ?
                        this.setState({'open': true})
                        :
                        null
                    }}>
                    <Text style={{color:'white', fontSize: 17, textAlign:'right'}}>{expDate.toString()}</Text>
                </TouchableOpacity>
                
                <DatePicker
                    modal
                    open = { this.state.open }
                    date = { new Date(this.state.bill.expirationDate.toDate()) }
                    mode = "date" 
                    onConfirm = {
                        (date) => {
                            this._onChangeExpirationDate(date, false)
                        }
                    }
                    onCancel = {
                        () => {
                            this.setState({'open': false})
                        }
                    }
                />
            </View>
        )
    }

    render() {
        const { bill, billID, isNewBill } = this.props.route.params;
        this.state.bill = bill
        this.state.billID = billID
        this.state.isNewBill = isNewBill

        return(
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={false} hideRightIcon={true} pageName={'Dettaglio Bolletta'} navBack={this._navBack}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, width:'100%'}}>
                    <ScrollView style={{width: '100%', height:'100%'}} contentContainerStyle={{alignItems:'center', flexDirection:'column'}}>

                        {!this.state.bill.paid && !this.state.isNewBill ?
                            <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'row', padding:20}}>
                                <TouchableOpacity style={{width:'30%'}} onPress={() => {this.setState({canModify: false})}}>
                                        <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                                        style={{width:'100%', justifyContent:'center', alignItems:'center', borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10, padding:5, opacity: this.state.canModify ? 1 : 0.5}}>

                                            <Text style={{color:'white', fontSize: 18}}>Visualizza</Text>
                                        </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:'30%'}} onPress={() => {this.setState({canModify: true})}}>
                                        <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                                        style={{width:'100%', justifyContent:'center', alignItems:'center', borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10, padding:5, opacity: this.state.canModify ? 0.5 : 1}}>

                                            <Text style={{color:'white', fontSize: 18}}>Modifica</Text>
                                        </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }
                        

                        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                            justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 5, paddingTop: 5}}>
                            <View style={{flex:2}}>
                                <Text style={{color:'white', fontSize: 18}}>Nome azienda:</Text>
                            </View>
                            <View style={{flex:2, flexDirection:'row', justifyContent:'center', alignItems:'center', paddingRight: 20}}>
                                <TextInput style={{fontSize: 18, backgroundColor:'trasparent', flex:4, color: 'white', textAlign:'right'}}
                                    underlineColorAndroid="transparent"
                                    value={this.state.bill.companyName}
                                    onChangeText={text => {this._onChangeCompanyName(text)}}
                                    editable={this.state.canModify ? true : false}/>
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
                                    keyboardType="numeric"
                                    editable={this.state.canModify ? true : false}/>
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
                                    placeholder={'Seleziona categoria'} placeholderStyle={{ color: '#bfc6ea' }} enabled={this.state.canModify ? true : false}>
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
                                    placeholder={'Seleziona ricorrenza'} placeholderStyle={{ color: '#bfc6ea' }} enabled={this.state.canModify ? true : false}>
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
                                    onChangeText={text => {this._onChangeNote(text)}}
                                    editable={this.state.canModify ? true : false}/>
                            </View>
                        </View>

                        <BillDetailsButtons bill={this.state.bill} canModify={this.state.canModify} isNewBill={this.state.isNewBill}
                            updateFirebase={this._updateFirebase} setPaidBill={this._setPaidBill} deleteBill={this._deleteBill}
                            insertFirebase={this._insertFirebase}/>
                            
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