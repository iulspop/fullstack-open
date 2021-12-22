import React, { useState, useEffect } from 'react'
import axios from 'axios'

const personsAPI = {
  getAll: () => axios.get('http://localhost:3001/persons'),
  post: ({ name, number }) => axios.post('http://localhost:3001/persons', { name, number }),
  delete: id => axios.delete(`http://localhost:3001/persons/${id}`),
}

export default function App() {
  const [persons, setPersons] = useState([])
  useEffect(() => personsAPI.getAll().then(res => setPersons(res.data)), [])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('Turtles')
  const [newNumber, setNewNumber] = useState('+1(500)999-000')

  const handleFilterChange = e => setFilter(e.target.value)
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)

  const addPerson = e => {
    e.preventDefault()

    const name = e.target.name.value
    const number = e.target.number.value

    if (contains(persons, name)) {
      alert('Name already added.')
    } else {
      personsAPI.post({ name, number }).then(() => personsAPI.getAll().then(res => setPersons(res.data)))
    }
  }

  const deletePerson = id => () => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
      personsAPI.delete(id).then(() => personsAPI.getAll().then(res => setPersons(res.data)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <label htmlFor="filter">filter shown with</label>
        <input name="filter" value={filter} onChange={handleFilterChange} />
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(person => person.name.match(new RegExp(filter, 'i')))
          .map(person => (
            <li key={person.id}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={deletePerson(person.id)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  )
}

const contains = (persons, name) => {
  for (let person of persons) {
    if (person.name === name) return true
  }
  return false
}
