import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import Chart from './components/Chart'
import SearchButton from './components/SearchButton'
import Sidebox from './components/Sidebox'
const baseUrl = '/api'

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState('-')
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [countries, setCountries] = useState([])
  const [range, setRange] = useState({start: 1960, end: 2017})


  const search = (event) => {
    event.preventDefault()
    setUrl(baseUrl + '/co2/country/' + query +'/1960/2017/' + checkboxChecked)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }
  const handlePerCapitaCheckbox = (event) => {
    setCheckboxChecked(!checkboxChecked)
  }

  const reset = (event) => {
    setData([])
    setUrl('')
    setCountries([])
    setRange({start: 1960, end: 2017})
  }

  const handleSetRangeStart = (event) => {
    setRange({start: event.target.value, end: range.end})
  }

  const handleSetRangeEnd = (event) => {
    setRange({start: range.start, end: event.target.value})
  }
  const handleRemove = (i) => {
    setData(data.filter((p, y) => i !== y ))
    setCountries(countries.filter((p, y) => i !== y ))
  }

  const stringToColor = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i*8)) & 0xFF
        colour += ('00' + value.toString(16)).substr(-2)
    }
    return colour
}

    useEffect(() => {
      Axios
      .get(url)
      .then(response => {
        let temp = []
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i])
        }
        if (response.data['values'] !== undefined){ 
          temp.push(response.data['values'])
          let country = {}
          country.country = response.data['country']
          country.color = stringToColor(response.data['country'])
          countries.push(country)
        }
        setData(temp)
      })
    }, [url])
  return(
  <div className='container'>
    <h1>WBApi CO2</h1>
    <br/>
    <SearchButton 
      handleChange = {handleChange}
      search = {search}
      handleCheckbox = {handlePerCapitaCheckbox}
      checkboxDefault = {checkboxChecked}
      reset = {reset} 
      //If there is some data, disable checkbox
      checkboxDisabled = {data.length < 1 ? false : true}
      handleRangeStart = {handleSetRangeStart}
      handleRangeEnd = {handleSetRangeEnd}
      range = {range}
      />
    <div>
      <Chart
        values = {data}
        isPerCapita = {checkboxChecked}
        countries = {countries}
        range = {range}
        />
    </div>
    <Sidebox 
      countries = {countries}
      handleRemove = {handleRemove}
    />
    
  </div>
)}
export default App;
