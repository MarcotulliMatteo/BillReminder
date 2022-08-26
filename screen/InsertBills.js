import React from "react";
import { StyleSheet, Text, View, StatusBar} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';

import  Header  from "../components/Header";

export default class InsertBills extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor:'#451182', justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor='#451182' barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={true} hideRightIcon={true} pageName={'Insert Bills'}/>
                <LinearGradient colors={['#4F0F84', '#9B4CB8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, backgroundColor:'#6A259C', width:'100%', justifyContent:'center', alignItems:'center'}}>
                    
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