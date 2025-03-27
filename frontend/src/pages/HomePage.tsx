import './../App.css'
import './Homepage.css'

function CourseBox(props: {courseName: string, courseDetail: string, onClick: () => void}) {
  return (
    <div className="coursebox" onClick={props.onClick}>
      <b>{props.courseName}</b>
      <br />
      {props.courseDetail}
    </div>
  );
}

export default function HomePage(props: { goToCourse: (courseId: string) => void }) {
  return (
    <>
      <div className="page">
        <div className="section">
          <h2>Courses</h2>
          <div className="courselist">
            <CourseBox onClick={() => props.goToCourse("ics33")} courseName="ICS 33 Winter 2025" courseDetail="Intermediate Programming with Python" />
            <CourseBox onClick={() => props.goToCourse("ics6d")} courseName="I&C SCI 6D LEC A" courseDetail="Discret Math for Cs" />
          </div>
        </div>
      </div>
    </>
  );
}
