import { useState } from 'react'

import Country from './Country'

export default function CountryListItem({ country }) {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(show ? false : true)

  return (
    <li>
      <h3>{country.name.common}</h3>
      <button onClick={toggleShow}>{show ? 'Hide' : 'Show'}</button>
      {show ? <Country country={country} /> : null}
    </li>
  )
}
