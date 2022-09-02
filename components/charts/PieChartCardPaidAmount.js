import React, {useState, useEffect} from "react";
import { View, Text, ScrollView} from "react-native";

import PieChart from 'react-native-pie-chart';

import colors from "../../utils/colors.json";
import mockData from "../../utils/mockData.json";

const PieChartCardPaidAmount = props => {

    const [dataNumber, setDataNumber] = useState([])
    const [dataColor, setDataColor] = useState([])

    useEffect(() => {
        _formatDataForPiePaidAmount()
    }, [props.data]);

    const _formatDataForPiePaidAmount = () => {
        const paidBillCount = {
            'paid': 0,
            'unpaid': 0
        }

        var dataNumberToRender = []
        var dataColorToRender = []

        if(props.data.length > 0) {
            props.data.forEach(element => {
                if(element._data.paid) {
                    paidBillCount.paid += parseInt(element._data.totalAmount)
                } else {
                    paidBillCount.unpaid += parseInt(element._data.totalAmount)
                }
            })   

            dataNumberToRender = [paidBillCount.paid, paidBillCount.unpaid]
            dataColorToRender = [mockData.categoryColor.paid, mockData.categoryColor.unpaid]
        }

        setDataNumber(dataNumberToRender)
        setDataColor(dataColorToRender)
    }

    return (
        <ScrollView style={{width: '100%', paddingLeft: 20,
            paddingRight: 20, paddingBottom: 35, borderBottomWidth: 1, borderBottomColor: colors.darkBackground}} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                <View style={{justifyContent:'space-between', alignItems:'center', padding: 15, flexDirection: 'row', width:'100%'}}>
                    <PieChart widthAndHeight={120} series={dataNumber} sliceColor={dataColor}/>

                    <View style={{justifyContent:'flex-end', alignItems:'flex-start', paddingLeft:20}}>
                        <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={0}>
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.paid, width:'15%', height:'50%', marginRight: 10}}/>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize: 17, color:colors.lightBlue}}>{dataNumber[0] + ' € '}</Text>
                                <Text style={{fontSize: 17, color:'white'}}>{'Pagate'}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={1}>
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.unpaid, width:'15%', height:'50%', marginRight: 10}}/>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{fontSize: 17, color:colors.lightBlue}}>{dataNumber[1] + ' € '}</Text>
                                <Text style={{fontSize: 17, color:'white'}}>{'Da pagare'}</Text>
                            </View>
                        </View>
                    </View>
            </View>
        </ScrollView>
    )
}

export default PieChartCardPaidAmount;