import React from "react";

import { StyleSheet, View, StatusBar, Text, SafeAreaView} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';

import Header  from "../components/Header";

import colors from "../utils/colors.json";

export default class Information extends React.Component  {

    _navBack = () => {
        this.props.navigation.goBack()
    }
    
    render() {
        return(
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <View style={styles.statusBarStyle}/>
                <Header hideLeftIcon={false} hideRightIcon={true} pageName={'Impostazioni'} navBack={this._navBack}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{height:'100%', width:'100%', flexDirection:'column', alignItems:'center'}}>
                        <View style={{width:'100%', height:'100%', padding:20}}>
                            <Text style={{fontSize: 18, color: 'white'}}>
                                Questa applicazione è stata sviluppata da The Celtic Mobile Developer tramite l'utilizzo del freamwork React Native e la piattaforma Firebase.
                                {"\n\n"}
                                Questa applicazione ha lo scopo di supportare l'utente nella schedulazione del piano di pagamento delle utenze.
                                {"\n\n"}
                                Per qualunque richiesta è possibile contattare gli sviluppatori tramite l'email thecelticmobiledeveloper@gmail.com.
                            </Text>
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