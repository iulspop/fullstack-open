import Part from './Part'
export default function Content({ parts }) {
  return parts.map(({ name, exercises }, idx) => <Part name={name} exercises={exercises} key={idx}/>)
}
