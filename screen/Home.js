import React from "react";
import { StyleSheet, Text, View} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import colors from "../utils/colors.json";
import TabLayout from '../components/TabLayout';
export default class Home extends React.Component  {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, flexDirection:'column'}}>
                <View style={{flex:1}}>

                </View>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                    style={{flex:5, width:'100%', justifyContent:'center', alignItems:'center'}}>
                        
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