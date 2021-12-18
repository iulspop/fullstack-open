export default function Total({ course }) {
  const { exercises1, exercises2, exercises3 } = course
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
}
