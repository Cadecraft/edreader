import './../App.css'
import './Homepage.css'

import { Course } from './../types'

function CourseBox(props: {course: Course, onClick: () => void}) {
  return (
    <div className="coursebox" onClick={props.onClick}>
      <b>{props.course.course.code}</b>
      <br />
      {props.course.course.name}
    </div>
  );
}

export default function HomePage(props: { courses: Course[], goToCourse: (course: Course) => void }) {

  return (
    <>
      <div className="page">
        <div className="section">
          <h2>Courses</h2>
          <div className="courselist">
            {props.courses.map(
              (course) => <CourseBox key={"" + course.course.id} course={course} onClick={() => props.goToCourse(course)} />
            )}
            {/*<CourseBox onClick={() => props.goToCourse("ics33")} courseName="ICS 33 Winter 2025" courseDetail="Intermediate Programming with Python" />
               <CourseBox onClick={() => props.goToCourse("ics6d")} courseName="I&C SCI 6D LEC A" courseDetail="Discret Math for Cs" />*/}
          </div>
        </div>
      </div>
    </>
  );
}
