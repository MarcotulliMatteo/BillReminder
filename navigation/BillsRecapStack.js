import React from "react";
import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BillDetailsScreen from "../screen/BillDetails";
import BillsRecapScreen from "../screen/BillsRecap";

import colors from "../utils/colors.json";

const Stack = createNativeStackNavigator()

const BillsRecapStack = () => {
    /*Wrapping Navigator into View with a background color prevent flashing white screen when navigate*/
    return(
        <View style={{ flex: 1, backgroundColor: colors.darkBackground }}>
            <Stack.Navigator initialRoutName="BillsRecap">
                <Stack.Screen options={{headerShown: false}} name='BillsRecapStack' component={BillsRecapScreen}/>
                <Stack.Screen options={{headerShown: false}} name='BillDetails' component={BillDetailsScreen}/>
            </Stack.Navigator>
        </View>
        
    )
}

export default BillsRecapStack;