import React, {useState, useEffect} from "react";
import { View, Text} from "react-native";

import PieChart from 'react-native-pie-chart';

import mockData from "../../utils/mockData.json";
import colors from "../../utils/colors.json";

const PieChartCardExpired = props => {

    const [dataNumber, setDataNumber] = useState([])
    const [dataColor, setDataColor] = useState([])

    useEffect(() => {
        _formatDataForPieExpired()
    }, [props.data]);

    const _formatDataForPieExpired = () => {
        const expiredBillCount = {
            'expired': 0,
            'unexpired': 0
        }

        var dataNumberToRender = []
        var dataColorToRender = []

        if(props.data.length > 0) {
            props.data.forEach(element => {
                const bill = element._data;
                const date = new Date(bill.expirationDate.toDate());
                const currentDate = new Date().setHours(0,0,0,0);

                if(date >= currentDate) {
                    expiredBillCount.unexpired += 1
                } else {
                    expiredBillCount.expired += 1
                }
            })   

            dataNumberToRender = [expiredBillCount.unexpired, expiredBillCount.expired]
            dataColorToRender = [mockData.categoryColor.unexpired, mockData.categoryColor.expired]
        }

        setDataNumber(dataNumberToRender)
        setDataColor(dataColorToRender)
    }

    return (
        <View style={{width: '100%', justifyContent:'center', alignItems:'center', paddingLeft: 20,
            paddingRight: 20, paddingBottom: 35, borderBottomWidth: 1, borderBottomColor: colors.darkBackground}}>
                <View style={{justifyContent:'space-between', alignItems:'center', padding: 15, flexDirection: 'row', width:'100%'}}>
                    <PieChart widthAndHeight={120} series={dataNumber} sliceColor={dataColor}/>

                    <View style={{justifyContent:'flex-end', alignItems:'flex-start', paddingLeft:20}}>
                        <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={0}>
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.unexpired, width:'15%', height:'30%', marginRight: 10}}/>
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize: 17, color:'white'}}>{dataNumber[0] + ' '}</Text>
                                <Text style={{fontSize: 17, color:'white'}}>{'Prossimi\nPagamenti'}</Text>
                            </View>
                            
                        </View>
                        <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={1}>
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.expired, width:'15%', height:'50%', marginRight: 10}}/>
                            <Text style={{fontSize: 17, color:'white'}}>{dataNumber[1] + ' ' + 'Scadute'}</Text>
                        </View>
                    </View>
            </View>
        </View>
    )
}

export default PieChartCardExpired;