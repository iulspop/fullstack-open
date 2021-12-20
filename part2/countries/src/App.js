import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import Country from './components/Country'

export default function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => setCountries(res.data))
  }, [])

  const [countriesFilter, setCountriesFilter] = useState('')
  const handleCountriesFilterChange = e => {
    setCountriesFilter(e.target.value)
  }

  console.log(countries)
  const filteredCountries = countries.filter(country => country.name.common.match(new RegExp(countriesFilter, 'i')))

  return (
    <div>
      <form>
        <label htmlFor="countriesFilter">find countries</label>
        <input name="countriesFilter" value={countriesFilter} onChange={handleCountriesFilterChange} />
      </form>
      <ul>
        {filteredCountries.length === 1 ? (
          <Country country={countries[0]}/>
        ) : filteredCountries.length <= 10 ? (
          filteredCountries.map(country => <li key={country.ccn3}>{country.name.common}</li>)
        ) : (
          <p>Too many matches, specify another filter</p>
        )}
      </ul>
    </div>
  )
}

const listLanguages = country => {
  const items = []
  for (let language in country.languages) {
    items.push(<li key={language}>{country.languages[language]}</li>)
  }
  return items
}
