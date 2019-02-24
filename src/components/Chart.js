import {FlexibleXYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines,
        LineSeries, Crosshair} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css'
import React, { useState } from 'react';

const Chart = ({values, isPerCapita, countries, range}) => {
    const [crosshairValues, setCrosshairValues] = useState([])
    const dataArr = () => {
      let arr = []
      for (let i = 0; i < values.length; i++){
        arr.push(values[i].map((p) => {
          return {x: p.year, y: (isPerCapita ? Number(p.value) : Number(p.value)/1000 )    }
        }).filter((p) => {return p.x >= range.start && p.x <= range.end}))
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
      for (let i = 0; i < n; i++) {
        table.push(
          <LineSeries
          key = {i.toString()}
          onNearestX = {onNearestX}
          getNull={(p) => p.y !== 0 || p.x > 2100}
          data={dataArr()[i]}
          color = {countries[i].color}/>
        )
  
      }
  
      return table
    }
    return (
      <FlexibleXYPlot
        onMouseLeave = {onMouseLeave}
        margin = {{left: 50, right: 10, top: 10, bottom: 40}}
        height={400}
        >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis 
        title = 'Year' 
        tickFormat = {(p) => {return p}}/>
        <YAxis
         title = 'Value'
         tickFormat = {(p) => {return isPerCapita ? p : p + 'k'}}
         />
        {RenderMultipleLineSeries(dataArr().length)}
        <Crosshair
          values = {crosshairValues} />
        </FlexibleXYPlot>
    )
  }

export default Chart;
