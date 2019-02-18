import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import Chart from './components/Chart'
import SearchButton from './components/SearchButton'




const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [url, setUrl] = useState('-')

  const search = (event) => {
    event.preventDefault()
    setUrl('http://localhost:3001/co2/country/' + query +'/1960/2017')
    console.log(url)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

    useEffect(() => {
      Axios
      .get(url)
      .then(response => {
        let temp = []
        for (let i = 0; i < data.length; i++) {
          temp.push(data[i])
        }
        temp.push(response.data['values'])
        setData(temp)
      })
    }, [url])
  return(
  <div class='container'>
    <h1>Hello World</h1>
    <SearchButton 
      handleChange = {handleChange}
      search = {search}
      />
    <Chart values = {data}/>
  </div>
)}
export default App;
