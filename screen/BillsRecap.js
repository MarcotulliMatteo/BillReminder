import React from "react";
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Ionicon from 'react-native-vector-icons/Ionicons';

import colors from "../utils/colors.json";
import mockData from "../utils/mockData.json";

import TabLayout from '../components/TabLayout';
import Header  from "../components/Header";
import BillCardsCategory  from "../components/BillCardsCategory";


export default class BillsRecap extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firestore();
    };

    state = {
        selected: 'Tutti',
        bills: [],
        paid: false,
        showBusy: false
    }

    categoryIcons = {
        Tutti: 'book-outline',
        Casa: 'home-outline',
        Veicoli: 'md-car-sport-outline',
        Abbonamenti: 'tv-outline',
        Altro: 'book-outline'
    }

    componentDidMount = () => {
    }

    _onPressCategory = (category) => {
        this.setState({selected: category})
        this._fetchPaidBills(this.state.paid, category)
    }

    _fetchPaidBills = (paid, category) => {
        this.setState({"showBusy": true})
        const userID = firebase.auth().currentUser.uid

        if(category == 'Tutti') {
            this.ref
            .collection('Bills')
            .where('userID', '==', userID)
            .where('paid', '==', paid)
            .orderBy('expirationDate')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot._docs
                this.setState({"bills": data, "showBusy": false})
            })
            .catch(err => {
                this.setState({"showBusy": false})
                console.error(err)
            });
        } else {
            this.ref
            .collection('Bills')
            .where('userID', '==', userID)
            .where('paid', '==', paid)
            .where('category', '==', category)
            .orderBy('expirationDate')
            .get()
            .then(querySnapshot => {
                const data = querySnapshot._docs
                this.setState({"bills": data, "showBusy": false})
            })
            .catch(err => {
                this.setState({"showBusy": false})
                console.error(err)
            });
        }
    }

    _changeDataPaidUnpaid = (root) => {
        this.state.paid = root.key == 'paid' ? true : false
        this._fetchPaidBills(this.state.paid, this.state.selected)
    }

    _onPressBillsCard = (bill, billID, isNewBill) => {

        if(isNewBill) {
            const newBill = {
                category: 'Casa',
                companyName: '',
                expirationDate: firestore.Timestamp.fromDate(new Date()),
                note: '',
                paid: false,
                recurrence: 'Mai',
                totalAmount: '',
                userID: firebase.auth().currentUser.uid
            }
            bill = newBill
        }

        this.props.navigation.navigate('BillDetails', {bill: bill, billID: billID, isNewBill: isNewBill})
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={true} hideRightIcon={true} pageName={'Utenze'}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                    <View style={{width:'100%', height:'100%'}}>
                        <View style={{paddingTop:20, paddingBottom:20}}>
                            <ScrollView horizontal={true}
                            contentContainerStyle={{alignItems:'center'}} showsHorizontalScrollIndicator={false}>
                                {
                                    mockData.category.map(cat => {
                                        return (
                                            <BillCardsCategory textCategory={cat} 
                                            isSelected={cat == this.state.selected ? true : false} 
                                            key={cat} 
                                            onPress={this._onPressCategory}
                                            icon={this.categoryIcons[cat]}/>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>

                        <View style={{borderTopColor: colors.mediumBackground , borderTopWidth: 1, width:'100%', height:'100%'}}>
                            <TabLayout category={this.state.selected} bills={this.state.bills} refreshData={this._changeDataPaidUnpaid} showBusy={this.state.showBusy} onPress={this._onPressBillsCard}/>
                        </View>
                    </View>

                    <View style={{position:'absolute', bottom: 30, right: 30}}>
                        <TouchableOpacity style={{borderRadius: 100/2, opacity:.6}} onPress={() => this._onPressBillsCard({}, null, true)}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                             start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                             style={{width:'100%', justifyContent:'center', alignItems:'center', padding: 15, borderRadius: 100/2}}>
                                <Ionicon name='add-outline' size={25} color={'white'}/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

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