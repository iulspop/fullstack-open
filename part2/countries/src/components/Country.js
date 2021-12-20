export default function Country({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>{listLanguages(country)}</ul>
      <img class="flag" src={country.flags.png} />
    </div>
  )
}
