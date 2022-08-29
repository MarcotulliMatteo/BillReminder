import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity} from "react-native";
import auth from '@react-native-firebase/auth';

import colors from '../utils/colors.json'

import { useDispatch } from "react-redux";
import { setUserLoggin } from "../providers/reduxProvider";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    //use effect run when component mount
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
            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <TextInput placeholder="Email" style={{width:'80%', backgroundColor:'grey', borderRadius: 10, margin: 10}}
                    value={email}
                    onChangeText={ text => {setEmail(text)} }/>
                <TextInput placeholder="Password" style={{width:'80%', backgroundColor:'grey', borderRadius: 10, margin: 10}} secureTextEntry
                    value={password}
                    onChangeText={ text => {setPassword(text)} }/>

                <TouchableOpacity style={{margin: 10, borderRadius: 10, padding: 10, backgroundColor: colors.darkButton, width: '70%', justifyContent: 'center', alignItems: 'center'}}
                    onPress={_singInUsernamePassword}>
                    <Text style={{fontSize: 17}}>
                        Accedi
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 10, borderRadius: 10, padding: 10, backgroundColor: colors.darkButton, width: '70%', justifyContent: 'center', alignItems: 'center'}}
                    onPress={_registerUsernamePassword}>
                    <Text style={{fontSize: 17}}>
                        Registrati
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;