import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Text, TouchableOpacity, SafeAreaView} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import { useDispatch } from "react-redux";
import { setUserLogout } from "../providers/reduxProvider";

import Header  from "../components/Header";

import colors from "../utils/colors.json";
import mockData from "../utils/mockData.json";

const SettingsScreen = ({ navigation: { navigate } }) => {
    const [selectedLanguages, setSelectedLanguages] = useState('Italiano');
    const dispatch = useDispatch()

    _onChangeLanguage = (lang) => {
        setSelectedLanguages(lang)
    }

    _doLogout = () => {
        auth().signOut().then(() => {
            const userLogoutType = setUserLogout()
            dispatch(userLogoutType)
        }).catch(err => {
            console.error(err)
        })
    }

    _navigateToInformation = () => {
        navigate('InformationScreen')
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
            <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
            <View style={styles.statusBarStyle}/>
            <Header hideLeftIcon={true} hideRightIcon={true} pageName={'Impostazioni'}/>
            <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{height:'100%', width:'100%', flexDirection:'column', alignItems:'center'}}>
                
                {/*
                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                    justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15, justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:2}}>
                        <Text style={{color:'white', fontSize: 18}}>Lingua</Text>
                    </View>
                    <View style={{flex:3, flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                        <Picker selectedValue={selectedLanguages} style={{ width:'100%', color: 'white'}} 
                            onValueChange={(itemValue, itemIndex) => _onChangeLanguage(itemValue)} dropdownIconColor={'white'}
                            placeholder={'Seleziona lingua'} placeholderStyle={{ color: '#bfc6ea' }}>
                                {
                                    mockData.languages.map(cat => {
                                        return (
                                            <Picker.Item label={cat} value={cat} key={cat}/>
                                        )
                                    })
                                }
                        </Picker>
                    </View>
                </View>
                */}

                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                    justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}} onPress={_navigateToInformation}>
                        <Text style={{color:'white', fontSize: 18}}>Informazioni</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.darkBackground,
                    justifyContent:'space-between', alignItems:'center', width:'90%', paddingBottom: 15, paddingTop: 15, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{width:'100%'}} onPress={_doLogout}>
                        <Text style={{color:'white', fontSize: 18}}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    statusBarStyle: {
        height: getStatusBarHeight()
    }
});

export default SettingsScreen;