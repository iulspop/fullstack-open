import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const personsAPI = {
  getAll: () => axios.get('http://localhost:3001/persons'),
  post: ({ name, number }) => axios.post('http://localhost:3001/persons', { name, number }),
  put: (person, number) => axios.put(`http://localhost:3001/persons/${person.id}`, { ...person, number }),
  delete: id => axios.delete(`http://localhost:3001/persons/${id}`),
}

export default function App() {
  const [persons, setPersons] = useState([])
  const resetPersons = () => personsAPI.getAll().then(res => setPersons(res.data))
  useEffect(() => resetPersons(), [])

  const [flashMessage, setFlashMessage] = useState(null)
  const flashError = createTrigger(setFlashMessage)('error')
  const flashSuccess = createTrigger(setFlashMessage)('success')

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

    const person = find(persons, name)
    if (person) {
      if (window.confirm(`${person.name} is already aded to phonebook, replce old number with a new one?`)) {
        personsAPI.put(person, number).then(resetPersons)
        flashSuccess(`Updated ${person.name}'s phone number`)
      }
    } else {
      personsAPI.post({ name, number }).then(resetPersons)
      flashSuccess(`Added ${name} to phonebook`)
    }
  }

  const deletePerson = id => () => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personsAPI.delete(id).then(resetPersons).catch(() => flashError('server error, try again'))
      flashSuccess(`Deleted ${person.name} from phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {flashMessage?.type === 'error' ? <div className="error">{flashMessage.text}</div> : ''}
      {flashMessage?.type === 'success' ? <div className="success">{flashMessage.text}</div> : ''}
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

const find = (persons, name) => {
  for (let person of persons) {
    if (person.name === name) return person
  }
  return null
}

const createTrigger = setFlashMessage => type => text => {
  setFlashMessage({ type, text })
  setTimeout(() => setFlashMessage(null), 3000)
}
