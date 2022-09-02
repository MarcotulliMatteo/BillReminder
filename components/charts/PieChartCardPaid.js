import React, {useState, useEffect} from "react";
import { View, Text} from "react-native";

import PieChart from 'react-native-pie-chart';

import mockData from "../../utils/mockData.json";
import colors from "../../utils/colors.json";

const PieChartCardPaid = props => {

    const [dataNumber, setDataNumber] = useState([])
    const [dataColor, setDataColor] = useState([])

    useEffect(() => {
        _formatDataForPiePaid()
    }, [props.data]);

    const _formatDataForPiePaid = () => {
        const paidBillCount = {
            'paid': 0,
            'unpaid': 0
        }

        var dataNumberToRender = []
        var dataColorToRender = []

        if(props.data.length > 0) {
            props.data.forEach(element => {
                if(element._data.paid) {
                    paidBillCount.paid += 1
                } else {
                    paidBillCount.unpaid += 1
                }
            })   

            dataNumberToRender = [paidBillCount.paid, paidBillCount.unpaid]
            dataColorToRender = [mockData.categoryColor.paid, mockData.categoryColor.unpaid]
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
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.paid, width:'15%', height:'50%', marginRight: 10}}/>
                            <Text style={{fontSize: 17, color:'white'}}>{dataNumber[0] + ' ' + 'Pagate'}</Text>
                        </View>
                        <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={1}>
                            <View style={{borderRadius:50, backgroundColor: mockData.categoryColor.unpaid, width:'15%', height:'50%', marginRight: 10}}/>
                            <Text style={{fontSize: 17, color:'white'}}>{dataNumber[1] + ' ' + 'Non pagate'}</Text>
                        </View>
                    </View>
            </View>
        </View>
    )
}

export default PieChartCardPaid;