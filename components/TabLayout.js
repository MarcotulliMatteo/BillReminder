import React, {useState} from 'react';
import { Dimensions, View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import colors from "../utils/colors.json";
import PaidBills from './PaidBills';
import UnpaidBills from './UnpaidBills';

const TabLayout = props => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Pagate' },
        { key: 'second', title: 'Da Pagare' },
    ]);

    const FirstRoute = () => (
        <PaidBills/>
    );
      
    const SecondRoute = () => (
        <UnpaidBills/>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
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