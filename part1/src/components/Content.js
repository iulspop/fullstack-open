export default function Content({ course }) {
  return (
    <>
      <p>
        {course.part1} {course.exercises1}
      </p>
      <p>
        {course.part2} {course.exercises2}
      </p>
      <p>
        {course.part3} {course.exercises3}
      </p>
    </>
  )
}
