import Part from './Part'
export default function Content({ course }) {
  return (
    <>
      <Part part={course.part1} exercises={course.exercises1} />
      <Part part={course.part2} exercises={course.exercises2} />
      <Part part={course.part3} exercises={course.exercises3} />
    </>
  )
}
