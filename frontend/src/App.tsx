import './App.css'
import { useEffect, useState } from 'react'
import { User } from './types'

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
  const [userData, setUserData] = useState<User>({
    name: "Loading...",
    avatar: "Loading...",
    email: "Loading...",
    username: "Loading..."
  });


  useEffect(() => {
    // Fetch the name and other information from the server
    fetch(
      "/api/selfuserinfo", {
        method: "GET"
      }
    )
    .then(resp => { return resp.json() })
    .then(res => setUserData(res));
  }, []);

  return (
    <>
      <div className="upperbar">
        <div>
          <b>edreader</b>
        </div>
        <div>
          signed in as {userData.name}
        </div>
      </div>
      <HomePage />
      <DiscussionPage />
    </>
  );
}

export default App
