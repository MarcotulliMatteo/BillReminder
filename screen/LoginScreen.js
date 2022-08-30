import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Ionicon from 'react-native-vector-icons/Ionicons';

import colors from '../utils/colors.json'

import { useDispatch } from "react-redux";
import { setUserLoggin } from "../providers/reduxProvider";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user)
                const userLoginType = setUserLoggin()
                dispatch(userLoginType)
            }
        })

        return unsubscribe
    }, [])



    _singInUsernamePassword = () => {
        if(email != '' && password != '') {
            auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
    
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
    
                console.error(error);
            });
        }
    }

    _registerUsernamePassword = () => {
        if(email != '' && password != '') {
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
        }
    }

    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width:'100%', height:'100%', alignItems:'center'}}>
                    
                    <View style={{width:'100%', marginBottom: 5, justifyContent:'center', alignItems:'center', padding: 30, flex:1}}>
                        <Text style={{textAlign:'center', fontSize: 20, color:'white'}}>Crea Account</Text>
                    </View>

                    <View style={{width:'100%', alignItems:'center', flex:10}}>
                        <View style={{width:'100%', marginBottom: 5}}>
                            <View style={{width:'85%', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{textAlign:'left', fontSize: 15, color:'white', marginBottom: 10, width:'85%', paddingStart: 5}}>Inserisci la tua email:</Text>
                            </View>
                            
                            <View style={{width:'100%', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                                <LinearGradient colors= {[colors.darkCard, colors.lightCard]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width: '85%', borderRadius:5, paddingLeft: 10, paddingRight: 10}}>
                                    <TextInput placeholder="Email" placeholderTextColor={'white'} style={{width:'100%', color: 'white', fontSize: 17}}
                                        value={email}
                                        onChangeText={ text => {setEmail(text)} }/>
                                </LinearGradient>
                            </View>
                        </View>    
                        
                        <View style={{width:'100%', marginBottom: 5}}>
                            <View style={{width:'85%', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{textAlign:'left', fontSize: 15, color:'white', marginBottom: 10, width:'85%', paddingStart: 5}}>Scegli una password:</Text>
                            </View>
                            
                            <View style={{width:'100%', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                                <LinearGradient colors= {[colors.darkCard, colors.lightCard]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width: '85%', borderRadius:5, paddingLeft: 10, paddingRight: 10}}>
                                    <TextInput placeholder="Password" placeholderTextColor={'white'} style={{width:'100%', color: 'white', fontSize: 17}} secureTextEntry
                                        value={password}
                                        onChangeText={ text => {setPassword(text)} }/>
                                </LinearGradient>
                            </View>
                        </View>

                        {/*
                            <View style={{width: '85%', justifyContent:'center', alignItems:'center', margin: 20, flexDirection: 'row'}}>
                                <Ionicon name="logo-google" size={45} style={{marginRight: 50}} color={colors.lightButton}/>
                                <Ionicon name="logo-facebook" size={45} color={colors.lightButton}/>
                            </View>
                        */}
                        
                        <TouchableOpacity style={{margin: 15, width: '75%', borderRadius: 5}}
                            onPress={_singInUsernamePassword}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                            style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                                <Text style={{fontSize: 17}}>
                                    Accedi
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin: 15, width: '75%', borderRadius: 5}}
                            onPress={_registerUsernamePassword}>
                            <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                            style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                                <Text style={{fontSize: 17}}>
                                    Registrati
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    statusBarStyle: {
        height: getStatusBarHeight()
    }
});

export default LoginScreen;