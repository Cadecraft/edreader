import './App.css'
import { useEffect, useState } from 'react'
import { User } from './types'
import HomePage from './pages/HomePage'
import DiscussionPage from './pages/DiscussionPage'

type pages = "home" | "discussion";

function App() {
  const [userData, setUserData] = useState<User>({
    name: "Loading...",
    avatar: "Loading...",
    email: "Loading...",
    username: "Loading..."
  });

  const [page, setPage] = useState<pages>("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

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

  const goToCourse = (courseId: string) => {
    setPage("discussion");
    setSelectedCourseId(courseId);
  }

  return (
    <>
      <div className="fullpage">
        <div className="upperbar">
          <div>
            <span className="edreader-title" onClick={() => setPage("home")}>edreader</span>
          </div>
          <div className="upperbar-username-box">
            <img className="avatarimg" src={userData.avatar} />
            <div>
              {userData.name}
              <br /> <span className="smalltext">Signed in via .env token</span>
            </div>
          </div>
        </div>
        {page == "home" && <HomePage goToCourse={goToCourse} />}
        {page == "discussion" && <DiscussionPage courseId={selectedCourseId} />}
        <div className="lowerbar">
          This is an unofficial client for Edstem's <a href="https://edstem.org/">Ed Discussion.</a>
        </div>
      </div>
    </>
  );
}

export default App
