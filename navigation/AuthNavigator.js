import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screen/LoginScreen";

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator;