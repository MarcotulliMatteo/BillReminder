import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from "../utils/colors.json";

const BillCardsCategory = props => {
    return (
        <View>
            <View style={{paddingLeft: 5}}>
                <TouchableOpacity style={{margin: 10,
                 height: props.isSelected ? 170 : 150, width: props.isSelected ? 270 : 250, justifyContent:'center', alignItems: 'center'}}
                 onPress={props.onPress.bind(this, props.textCategory)}>
                    <LinearGradient colors={[colors.darkButton, colors.lightButton]} 
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
                        style={{flex:5, width:'100%', justifyContent:'center', alignItems:'center', borderRadius: 15}}>
                        <Text style={{fontWeight:'bold', fontSize: 20, color: 'white'}}>
                            {props.textCategory}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BillCardsCategory;