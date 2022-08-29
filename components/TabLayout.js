import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import colors from "../utils/colors.json";
import PaidBills from './PaidBills';
import UnpaidBills from './UnpaidBills';

const TabLayout = props => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'upaid', title: 'Da Pagare' },
        { key: 'paid', title: 'Pagate' },
    ]);

    useEffect(() => {
        props.refreshData(routes[index])
    }, [index])

    const FirstRoute = () => (
        <UnpaidBills category={props.category} bills={props.bills}/>
    );
      
    const SecondRoute = () => (
        <PaidBills category={props.category} bills={props.bills}/>
    );

    const renderScene = SceneMap({
        paid: FirstRoute,
        upaid: SecondRoute,
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