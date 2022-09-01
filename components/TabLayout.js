import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import BillCards from './BillCard';

import colors from "../utils/colors.json";
import TabBills from './TabBills';

const TabLayout = props => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'unpaid', title: 'Da Pagare' },
        { key: 'paid', title: 'Pagate' },
    ]);

    useEffect(() => {
        props.refreshData(routes[index])
    }, [index])

    return (
       <SafeAreaView style={{width:'100%', height:'100%'}}>
            <View style={{flexDirection:'row', width:'100%'}}>
                <TouchableOpacity style={{flex:1, padding: 15, borderBottomColor: colors.lightButton,
                     justifyContent:'center', alignItems: 'center', borderBottomWidth: index == 0 ? 2 : 0}}
                     onPress={() => {setIndex(0)}}>
                    <Text style={{fontSize: 18, color:'white'}}>Da Pagare</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, padding: 15, borderBottomColor: colors.lightButton,
                     justifyContent:'center', alignItems: 'center', borderBottomWidth: index == 1 ? 2 : 0}}
                     onPress={() => {setIndex(1)}}>
                    <Text style={{fontSize: 18, color:'white'}}>Pagate</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: '100%'}}>
                {index == 0 ?
                    <TabBills category={props.category} bills={props.bills} showBusy={props.showBusy} paid={false} onPress={props.onPress}/>
                    :
                    <TabBills category={props.category} bills={props.bills} showBusy={props.showBusy} paid={true} onPress={props.onPress}/>
                }
            </View>
       </SafeAreaView>
    )
}

export default TabLayout;