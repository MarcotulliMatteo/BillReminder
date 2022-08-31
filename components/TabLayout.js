import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

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

    const FirstRouteUnpaid = () => (
        <TabBills category={props.category} bills={props.bills} showBusy={props.showBusy} paid={false} onPress={props.onPress}/>
    );
      
    const SecondRoutePaid = () => (
        <TabBills category={props.category} bills={props.bills} showBusy={props.showBusy} paid={true} onPress={props.onPress}/>
    );

    const renderScene = SceneMap({
        unpaid: FirstRouteUnpaid,
        paid: SecondRoutePaid,
    });

    const initialLayout = { width: Dimensions.get('window').width};

    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: colors.lightButton}}
          style={{ backgroundColor: 'transparent' }}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    )
}

export default TabLayout;