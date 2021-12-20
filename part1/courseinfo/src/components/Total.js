export default function Total({ parts }) {
  return (
    <p>
      <strong>Total of {parts.reduce((num, part) => part.exercises + num, 0)} exercises</strong>
    </p>
  )
}
