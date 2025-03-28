import './App.css'
import { useEffect, useState } from 'react'
import { User, Course } from './types'
import HomePage from './pages/HomePage'
import DiscussionPage from './pages/DiscussionPage'
import UpperBar from './components/upperbar'

function App() {
  const [userData, setUserData] = useState<User>({
    name: "Loading...",
    avatar: "",
    email: "Loading...",
    username: "Loading..."
  });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch the name and other information from the server
    fetch(
      "/api/selfuserinfo", {
        method: "GET"
      }
    )
    .then(resp => { return resp.json() })
    .then(res => setUserData(res));
    fetch(
      "/api/selfusercourses", {
        method: "GET"
      }
    )
    .then(resp => { return resp.json() })
    .then(res => setCourses(res));
  }, []);

  const goToCourse = (course: Course) => {
    setSelectedCourse(course);
  }

  return (
    <>
      <div className="fullpage">
        <UpperBar selectedCourse={selectedCourse} clickTitle={() => setSelectedCourse(null)} userData={userData} />
        {selectedCourse ? <DiscussionPage course={selectedCourse} /> : <HomePage courses={courses} goToCourse={goToCourse} />}
        <div className="lowerbar">
          This is an unofficial client for Edstem's <a href="https://edstem.org/">Ed Discussion.</a>
        </div>
      </div>
    </>
  );
}

export default App
