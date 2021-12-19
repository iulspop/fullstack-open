import './App.css'
import { useState } from 'react'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <h2>statistics</h2>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  )
}

function Statistics({ good, neutral, bad }) {
  return (
    <>
      <div>
        <dt>good</dt>
        <dd>{good}</dd>
      </div>
      <div>
        <dt>neutral</dt>
        <dd>{neutral}</dd>
      </div>
      <div>
        <dt>bad</dt>
        <dd>{bad}</dd>
      </div>
    </>
  )
}
