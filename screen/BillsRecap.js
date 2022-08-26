import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';

import colors from "../utils/colors.json";

import TabLayout from '../components/TabLayout';
import Header  from "../components/Header";
import BillCardsCategory  from "../components/BillCardsCategory";

export default class BillsRecap extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        selected: 'Tutti'
    }

    category = [
        'Tutti',
        'Casa',
        'Veicoli',
        'Abbonamenti'
    ]

    _onPressCategory = (category) => {
        this.setState({selected: category})
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
                                            onPress={this._onPressCategory}/>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>

                        <View style={{borderTopColor: colors.mediumBackground , borderTopWidth: 1, width:'100%', height:'100%'}}>
                            <TabLayout/>
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