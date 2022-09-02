import React, {useState, useEffect} from "react";
import { View, Text} from "react-native";

import PieChart from 'react-native-pie-chart';

import mockData from "../../utils/mockData.json";
import colors from "../../utils/colors.json";

const PieChartCardCategory = props => {

    const [dataNumber, setDataNumber] = useState([])
    const [dataColor, setDataColor] = useState([])

    useEffect(() => {
        _formatDataForPie()
    }, [props.data]);

    const _formatDataForPie = () => {
        const categoryBillCount = {}
        const dataNumberToRender = []
        const dataColorToRender = []

        if(props.data.length > 0) {
            props.data.forEach(element => {
                if(categoryBillCount.hasOwnProperty(element._data.category) ) {
                    categoryBillCount[element._data.category] += 1
                } else {
                    categoryBillCount[element._data.category] = 1
                }
            })
    
            mockData.categoryForSelector.forEach(elem => {
                dataNumberToRender.push(categoryBillCount[elem])
                dataColorToRender.push(mockData.categoryColor[elem])
            })    
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
                        {
                            mockData.categoryForSelector.map((elem, index) => {
                                return(
                                    <View style={{flexDirection:'row', padding:5, justifyContent:'center', alignItems:'center'}} key={index}>
                                        <View style={{borderRadius:50, backgroundColor:mockData.categoryColor[elem], width:'15%', height:'50%', marginRight: 10}}/>
                                        <Text style={{fontSize: 17, color:'white'}}>{dataNumber[index] + ' ' + elem}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
            </View>
        </View>
    )
}

export default PieChartCardCategory;