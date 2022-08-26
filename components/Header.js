import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import colors from "../utils/colors.json";

const Header = props => {

    return (
        <View style={{width:'100%', backgroundColor: colors.darkBackground, height: '8%', elevation:5, zIndex:1, marginTop: 0}}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                {
                    props.hideLeftIcon ? null :
                    <View style={{justifyContent:'flex-start', paddingRight: 10, paddingLeft: 15}}>
                        <MaterialIcons name="arrow-back-ios" size={25} color="white" onPress={()=>{}}/>
                    </View>
                }
                
                <View style={{flex:4, alignItems:'center'}}>
                    <Text style={{color:'white'}}>{props.pageName}</Text>
                </View>
                {
                    props.hideRightIcon ? null :
                    <View style={{justifyContent:'flex-end', paddingRight: 15, paddingLeft: 10}}>
                        <FontAwesomeIcons name="user-circle-o" size={25} color="white" onPress={() => {}}/>
                    </View>
                }
            </View>
        </View>
    )
}

export default Header;