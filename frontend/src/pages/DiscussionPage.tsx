import './../App.css'
import './DiscussionPage.css'

export default function DiscussionPage(props: {courseId: string}) {
  return (
    <>
      <div className="page">
        <div className="discussionmain">
          <div className="left-sidebar">
            <h2>Discussion for {props.courseId}</h2>
            <div className="threadslist">
              <div className="thread">
                <b>How to print hello world?</b>
                <br />
                Exercises - Set 1 • John Student
              </div>
              <div className="thread">
                <b>Printing "hello world"</b>
                <br />
                Exercises - Set 1 • Random User
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
              <div className="thread">
                <b>What does print mean</b>
                <br />
                Exercises - Set 1 • First Person
              </div>
            </div>
          </div>
          <div className={"section thread-details"}>
            Nothing here yet!
          </div>
        </div>
      </div>
    </>
  );
}
