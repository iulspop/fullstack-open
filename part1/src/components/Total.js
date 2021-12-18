export default function Total({ parts }) {
  return <p>Number of exercises {parts.reduce((num, part) => part.exercises + num, 0)}</p>
}
