const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const fs = require('fs')
const uuid = require('uuid')

const app = express()

app.use(cors())

app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))

app.get('/api/persons', (_, res) => {
  const persons = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const persons = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

  const person = persons.find(person => person.id === req.params.id)
  if (person === undefined) {
    res.sendStatus(404)
  } else {
    res.json(person)
  }
})

app.post('/api/persons', (req, res) => {
  const persons = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

  const newPerson = req.body

  if (typeof newPerson.name !== 'string' || typeof newPerson.number !== 'string') {
    res.status(400).json({ error: 'person properties missing or invalid' })
  }

  if (persons.some(person => person.name === newPerson.name)) {
    res.status(409).json({ error: 'name exists in phone book' })
  }

  newPerson.id = uuid.v4()
  persons.push(newPerson)

  fs.writeFileSync('./db.json', JSON.stringify(persons))
  res.sendStatus(200)
})

app.delete('/api/persons/:id', (req, res) => {
  let persons = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

  persons = persons.filter(person => person.id !== req.params.id)

  fs.writeFileSync('./db.json', JSON.stringify(persons))
  res.sendStatus(204)
})

app.get('/info', (req, res) => {
  const persons = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
  res.send(`<p>Phonebook has info for ${persons.length} people</p>\n${new Date().toString()}`)
})

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
