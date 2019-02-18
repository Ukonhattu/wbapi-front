import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css'
import React, { useState, useEffect } from 'react';

const Chart = ({values}) => {
    const [crosshairValues, setCrosshairValues] = useState([])
    const dataArr = () => {
      let arr = []
      for (let i = 0; i < values.length; i++){
        arr.push(values[i].map((p) => {
          return {x: p.year, y: Number(p.value)/1000}
        }))
    }
      return arr
    }
    const onMouseLeave = () => {
      setCrosshairValues([])
    }
  
    const onNearestX = (value, index) => {
      setCrosshairValues([value])
    }
    const RenderMultipleLineSeries = (n) => {
      let table = []
      console.log('dataArr: ',dataArr())
      for (let i = 0; i < n; i++) {
        table.push(
          <LineSeries
          onNearestX = {onNearestX}
          getNull={(p) => p.y !== 0 || p.x > 2100}
          data={dataArr()[i]}/>
        )
  
      }
  
      return table
    }
    return (
      <XYPlot
        onMouseLeave = {onMouseLeave}
        margin = {{left: 100, right: 10, top: 10, bottom: 40}}
        //xType = 'ordinal'
        width={1000}
        height={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis 
        title = 'Year' 
        tickFormat = {(p) => {return p}}/>
        <YAxis
         title = 'Value'
         />
        {RenderMultipleLineSeries(dataArr().length)}
        <Crosshair
          values = {crosshairValues} />
        </XYPlot>
    )
  }

export default Chart;
