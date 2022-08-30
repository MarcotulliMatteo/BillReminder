import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import colors from '../utils/colors.json';

const PaidBillCards = props => {
    return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', padding: 10}}>
            <LinearGradient colors= {[colors.darkCard, colors.lightCard]}
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width: '100%', borderRadius:10, elevation: 2}}>
                <TouchableOpacity>
                    <View style={{flexDirection:'row', padding:5, justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{paddingLeft: 20}}>
                            <Text style={{paddingBottom: 10, fontSize: 18, color:'white'}}>{props.companyName}</Text>
                            <Text style={{fontSize: 18, color:'#01C8CB'}}>{props.billPrice}</Text>
                        </View>
                        <View style={{paddingRight: 20}}>
                            <Text style={{fontSize: 18, color:'white'}}>Segna come pagata</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )   
}

export default PaidBillCards;