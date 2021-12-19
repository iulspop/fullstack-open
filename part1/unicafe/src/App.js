import './App.css'
import { useState } from 'react'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = [
    { text: 'good', value: good },
    { text: 'neutral', value: neutral },
    { text: 'bad', value: bad },
  ]

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
      {good === 0 && neutral === 0 && bad === 0 ? <p>No feedback given</p> : <Statistics statistics={statistics} />}
    </div>
  )
}

function Statistics({ statistics }) {
  const all = statistics.reduce((total, stat) => total + stat.value, 0)
  const average = (all / 3).toFixed(2)
  const positive = ((statistics[0].value / all) * 100).toFixed(2)

  statistics = statistics.concat({ text: 'all', value: all })
  statistics = statistics.concat({ text: 'average', value: average })
  statistics = statistics.concat({ text: 'positive', value: String(positive) + ' %' })

  return statistics.map(({ text, value }, idx) => <StatisticsLine text={text} value={value} key={idx} />)
}

function StatisticsLine({ text, value }) {
  return (
    <div>
      <dt>{text}</dt>
      <dd>{value}</dd>
    </div>
  )
}
