import './../App.css'
//import './UpperBar.css'
import { User, Course } from './../types'
import AvatarImage from './../components/AvatarImage'

export default function UpperBar(props: {selectedCourse: Course | null, clickTitle: () => void, userData: User}) {

  return (
    <div className="upperbar">
      <div>
        <span className="edreader-title" onClick={props.clickTitle}>edreader</span>
        {props.selectedCourse && <span>{" "}•{" Discussion for "}{props.selectedCourse.course.code}</span>}
      </div>
      <div className="upperbar-username-box">
        <AvatarImage avatarSrc={props.userData.avatar} />
        <div>
          {props.userData.name}
          <br /> <span className="smalltext">Signed in via .env token</span>
        </div>
      </div>
    </div>
  );
}
