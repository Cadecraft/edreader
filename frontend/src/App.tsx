import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CourseBox(props: {courseName: string, courseDetail: string}) {
  return (
    <div className="coursebox">
      <b>{props.courseName}</b>
      <br />
      {props.courseDetail}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <div className="organizer">
        <div className="section">
          <h2>Courses</h2>
          <div className="courselist">
            <CourseBox courseName="ICS 33 Winter 2025" courseDetail="Intermediate Programming with Python" />
            <CourseBox courseName="I&C SCI 6D LEC A" courseDetail="Discret Math for Cs" />
          </div>
        </div>
      </div>
    </>
  );
}

function DiscussionPage() {
  return (
    <>
      <div className="organizer">
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div className="upperbar">
        <div>
          <b>edreader</b>
        </div>
        <div>
          signed in as
        </div>
      </div>
      <HomePage />
      <DiscussionPage />
    </>
  );
}

export default App
