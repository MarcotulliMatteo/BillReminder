import React from "react";
import { StyleSheet, View, ScrollView, StatusBar, Text} from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient';
import Header  from "../components/Header";

import colors from "../utils/colors.json";

export default class BillDetails extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {
        bill: null
    }

    _navBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        this.state.bill = this.props.route.params.bill

        return(
            <SafeAreaView style={{flex:1, backgroundColor: colors.darkBackground, justifyContent:'center', alignItems:'center'}}>
                <StatusBar backgroundColor={colors.darkBackground} barStyle="light-content" style={styles.statusBarStyle}/>
                <Header hideLeftIcon={false} hideRightIcon={true} pageName={'Bill Details'} navBack={this._navBack}/>
                <LinearGradient colors={[colors.mediumBackground, colors.lightBackground]} 
                 start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{flex:5, width:'100%', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                    <Text>Bill Details</Text>

                 </LinearGradient>
            </SafeAreaView>
            )
    }
}

const styles = StyleSheet.create({
    statusBarStyle: {
        height: getStatusBarHeight()
    }
});