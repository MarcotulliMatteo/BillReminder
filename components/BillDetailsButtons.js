import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from "../utils/colors.json";

const BillDetailsButtons = props => {

    return (
        <View style={{width: '100%', paddingTop: 20, justifyContent:'center', alignItems:'center'}}> 
            {props.canModify && !props.bill.paid && !props.isNewBill ?
                <TouchableOpacity style={{margin: 15, width: '75%'}}
                onPress={props.updateFirebase.bind(this)}>
                    <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                    style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                        <Text style={{fontSize: 17, color:'white'}}>
                            Salva modifiche
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                null
            }
            
            {!props.bill.paid && !props.isNewBill ?
                <TouchableOpacity style={{margin: 15, width: '75%'}}
                onPress={props.setPaidBill.bind(this)}>
                    <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                    style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                        <Text style={{fontSize: 17, color:'white'}}>
                            Contrassegna come pagata
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                null
            }
            
            {!props.bill.paid && !props.isNewBill ?
                <TouchableOpacity style={{margin: 15, width: '75%'}}
                    onPress={props.deleteBill.bind(this)}>
                    <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                    style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                        <Text style={{fontSize: 17, color:'white'}}>
                            Elimina
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                null
            }

            {props.isNewBill ?
                <TouchableOpacity style={{margin: 15, width: '75%'}}
                 onPress={props.insertFirebase.bind(this, props.bill)}>
                    <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                    style={{width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 10, padding: 15}}>
                        <Text style={{fontSize: 17, color:'white'}}>
                            Salva
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                :
                null
            }
        </View>
    )
}

export default BillDetailsButtons;