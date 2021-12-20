import Part from './Part'
export default function Content({ parts }) {
  return parts.map(({ id, name, exercises }) => <Part name={name} exercises={exercises} key={id}/>)
}
