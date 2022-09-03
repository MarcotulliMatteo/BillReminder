import React from "react";
import { StyleSheet, View, StatusBar, Text, ScrollView} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

import Header  from "../components/Header";
import PieChartCardCategory from "../components/charts/PieChartCardCategory";
import PieChartCardPaid from "../components/charts/PieChartCardPaid";
import PieChartCardPaidAmount from "../components/charts/PieChartCardPaidAmount";
import PieChartCardExpired from "../components/charts/PieChartCardExpired";

import colors from "../utils/colors.json";

export default class Home extends React.Component  {
    constructor(props) {
        super(props);
        this.ref = firestore();
    };

    state = {
        bills: [],
        showPieChartBusy: false
    }

    componentDidMount = () => {
        this._fetchLastMonthBill()
    }

    _fetchLastMonthBill = () => {
        const date = new Date();
        const firstDayCurrentMonth = this._getFirstDayOfMonth(date.getFullYear(),date.getMonth());
        const firestoreTimestamp = firestore.Timestamp.fromDate(firstDayCurrentMonth)
        const userID = firebase.auth().currentUser.uid
        this.ref
            .collection('Bills')
            .where('userID', '==', userID)
            .where('expirationDate', '>=', firestoreTimestamp)
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

    _getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1);
    }
      

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, flexDirection:'column'}}>
                <Header hideLeftIcon={true} hideRightIcon={true} pageName={'Statistiche Mese'} navBack={()=>{}}/>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width:'100%', height: '100%'}}>
                    
                    <ScrollView>
                        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15, justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize: 18}}>Saldo</Text>
                        </View>
                        <PieChartCardPaidAmount data={this.state.bills} showPieChartBusy={this.state.showPieChartBusy}/>
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15, justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize: 18}}>Categorie</Text>
                        </View>
                        <PieChartCardCategory data={this.state.bills} showPieChartBusy={this.state.showPieChartBusy}/>

                        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15, justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize: 18}}>Stato Pagamenti</Text>
                        </View>
                        <PieChartCardPaid data={this.state.bills} showPieChartBusy={this.state.showPieChartBusy}/>

                        <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15, justifyContent:'center'}}>
                            <Text style={{color:'white', fontSize: 18}}>Stato Scadenze</Text>
                        </View>
                        <PieChartCardExpired data={this.state.bills} showPieChartBusy={this.state.showPieChartBusy}/>

                        <View style={{paddingBottom: 40}}/>
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