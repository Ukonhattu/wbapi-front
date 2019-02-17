import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
import '../node_modules/react-vis/dist/style.css'



const Chart = ({values}) => {
  const [crosshairValues, setCrosshairValues] = useState([])
  const dataArr = values.map((p) => {
    return {x: p.year, y: p.value}
  })
  const onMouseLeave = () => {
    setCrosshairValues([])
  }

  const onNearestX = (value, index) => {
    setCrosshairValues([value])
  }
  return (
    <XYPlot
      onMouseLeave = {onMouseLeave}
      xType = 'ordinal'
      width={700}
      height={400}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title = 'Year' />
      <YAxis title = 'Value'/>
      <LineSeries
        onNearestX = {onNearestX}
        getNull={(p) => p.y !== "" || p.x > 2100}
        data={dataArr}/>
      <Crosshair
        values = {crosshairValues} />
      </XYPlot>
  )
}

const SearchButton = ({handleChange, search}) => {

  return (
    <form onSubmit={search}>
      <input 
        onChange = {handleChange}
      />
      <button type = 'submit'>Search</button>
    </form>
  )
}
const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState('http://localhost:3001/pop/country/Finland/1995/2017')

  const search = (event) => {
    event.preventDefault()
    setUrl('http://localhost:3001/co2/country/' + query +'/1995/2017')
    console.log(url)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const getData = () => {
    console.log('test')
    useEffect(() => {
      Axios
      .get(url)
      .then(response => {
        setData(response.data)
        console.log('effect')
      })
    }, [url])
  }
  getData()
  let values = []
  if (data.country){ 
    values = data['values']
  }
  console.log('values', values)
  console.log('data', data)
  return(
  <div>
    <h1>Hello World</h1>
    <SearchButton 
      handleChange = {handleChange}
      search = {search}
      />
    <Chart values = {values}/>
  </div>
)}
export default App;
