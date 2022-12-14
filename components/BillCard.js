import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import colors from '../utils/colors.json';

const BillCards = props => {
    return (
        <View style={{justifyContent:'center', alignItems:'center', padding: 10}}>
            <LinearGradient colors= {[colors.darkCard, colors.lightCard]}
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{width: '100%', borderRadius:10, elevation: 2}}>
                <TouchableOpacity onPress={props.onPress.bind(this, props.bill, props.billID, false)}>
                    <View style={{flexDirection:'row', paddingLeft:20, paddingRight:20, paddingBottom:15, paddingTop: 15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:'column'}}>
                            <View style={{paddingBottom: 3}}>
                                <Text style={{fontSize: 18, color:'white'}}>{props.companyName}</Text>
                            </View>
                            <View style={{paddingTop: 3}}>
                                <Text style={{fontSize: 15, color: props.isExpired ? colors.expiredRed : 'white'}}>{props.expirationDate}</Text>
                            </View>
                        </View>
                        <View style={{fontSize: 18, color:'white'}}>
                            <Text style={{fontSize: 18, color: colors.lightBlue}}>{props.billPrice}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )   
}

export default BillCards;