import React from "react";
import { StyleSheet, View, ScrollView, StatusBar} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import colors from "../utils/colors.json";

import TabLayout from '../components/TabLayout';
import Header  from "../components/Header";
import BillCardsCategory  from "../components/BillCardsCategory";
import BillDetails from "../screen/BillDetails";

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

    category = [
        'Tutti',
        'Casa',
        'Veicoli',
        'Abbonamenti',
        'Altro'
    ]

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

    _onPressBillsCard = (bill) => {
        this.props.navigation.navigate('BillDetails', {bill: bill})
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={true} hideRightIcon={true} pageName={'Bills Recap'}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                    <View style={{width:'100%', height:'100%'}}>
                        <View style={{paddingTop:20, paddingBottom:20}}>
                            <ScrollView horizontal={true}
                            contentContainerStyle={{alignItems:'center'}} showsHorizontalScrollIndicator={false}>
                                {
                                    this.category.map(cat => {
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