import React from "react";

import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

import { useSelector } from "react-redux";

const AppStack = () => {
    const loginCheck = useSelector(state => state.isLoggedInFunc)

    return(
        <NavigationContainer>
              {!loginCheck.isLoggedIn ? 
                <AuthNavigator/> 
                :
                <TabNavigator/>
              }
        </NavigationContainer>
    )
}

export default AppStack;