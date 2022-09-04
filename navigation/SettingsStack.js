import React from "react";
import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screen/Settings";
import InformationScreen from "../screen/Information";

import colors from "../utils/colors.json";

const Stack = createNativeStackNavigator()

const SettingsStack = () => {
    /*Wrapping Navigator into View with a background color prevent flashing white screen when navigate*/
    return(
        <View style={{ flex: 1, backgroundColor: colors.darkBackground }}>
            <Stack.Navigator initialRoutName="SettingsScreen">
                <Stack.Screen options={{headerShown: false}} name='SettingsScreen' component={SettingsScreen}/>
                <Stack.Screen options={{headerShown: false}} name='InformationScreen' component={InformationScreen}/>
            </Stack.Navigator>
        </View>
        
    )
}

export default SettingsStack;