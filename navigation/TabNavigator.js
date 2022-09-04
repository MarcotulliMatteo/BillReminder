import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "../utils/colors.json";

import StatisticScreen from '../screen/Statistic';
import BillsRecapStack from './BillsRecapStack';
import SettingsStack from './SettingsStack';

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
            <Tab.Screen name='Home' component={BillsRecapStack} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <Ionicons name="home-outline" color={color} size={size}/>
                    )
                }
            }}/>
            <Tab.Screen name='BillsRecap' component={StatisticScreen} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <MaterialCommunityIcons name="chart-line" color={color} size={size}/>
                    )
                }
            }}/>
            <Tab.Screen name='SettingsStack' component={SettingsStack} options={{
                tabBarIcon: ({color, size}) => {
                    return(
                        <Ionicons name="settings-outline" color={color} size={size}/>
                    )
                }
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigator;