export default function Country({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>{listLanguages(country)}</ul>
      <img className="flag" src={country.flags.png} />
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
