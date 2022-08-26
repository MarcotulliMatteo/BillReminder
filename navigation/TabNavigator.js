import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import EntypoIcons from "react-native-vector-icons/Entypo";

import colors from "../utils/colors.json";

import HomeScreen from '../screen/Home';
import BillsRecapScreen from '../screen/BillsRecap';
import InsertBillsScreen from '../screen/InsertBills';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: '#451182'},
            tabBarInactiveTintColor: colors.darkButton,
            tabBarActiveTintColor: colors.lightButton
        }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <Ionicons name="home-outline" color={color} size={size}/>
                    )
                }
            }}/>
            <Tab.Screen name='BillsRecap' component={BillsRecapScreen} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <EntypoIcons name="documents" color={color} size={size}/>
                    )
                }
            }}/>
            <Tab.Screen name='InsertBills' component={InsertBillsScreen} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <Ionicons name="add-circle-outline" color={color} size={size}/>
                    )
                }
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;