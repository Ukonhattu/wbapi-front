import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';




const Year = ({year, value}) => {
  return (
    <li>{value} : {year[value]}</li>
  )
}

const Pop = ({data}) => {

  if (data === [])
  return (
    ""
  )
  return (
    JSON.stringify(data)
  )
}
const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('effect')
    Axios
    .get('http://localhost:3001/pop/country/Finland/1995/2018')
    .then(response => {
      console.log('promise fullfilled')
      setData(response.data)
    })
  }, [])
  console.log(data)
  let years = {}
  if (data.years) years = data
  return(
  <div>
    <h1>Hello World</h1>
    <Pop data = {data}/>
  </div>
)}
export default App;
