import { useState, useEffect } from 'react';
import './../App.css'
import './DiscussionPage.css'
import { Course, Thread, ThreadDetails, ThreadUser, Answer, ThreadUserMap, ThreadComment } from './../types'
import AvatarImage from './../components/AvatarImage'
import $ from 'jquery'

/** Format a date based on a time string provided by the API
 * Example: "2024-12-15T13:52:27.137683+11:00"
*/
function formatDate(time: string) {
  return time.substring(0, 4)
    + "/" + time.substring(5, 7)
    + "/" + time.substring(8, 10)
    + " " + time.substring(11, 13)
    + ":" + time.substring(14, 16);
}

function ThreadBox(props: {thread: Thread, onClick: () => void, selected: boolean}) {
  const category = props.thread.subsubcategory ? props.thread.subsubcategory
    : props.thread.subcategory ? props.thread.subcategory
    : props.thread.category
  return (
    <div className={`thread ${props.selected ? "thread-selected" : ""}`} onClick={props.onClick}>
      <span>{props.thread.title}</span>
      <br />
      <span className="smalltext">
        {category}
        {" "}•{" "}
        {props.thread.user ? props.thread.user.name : "Anonymous"}
        {" "}•{" "}
        {formatDate(props.thread.created_at)}
      </span>
    </div>
  );
}

function UserDisp(props: {user: ThreadUser | null, miniSize?: boolean}) {
  return (
    <div className="userdisp-container">
      <AvatarImage avatarSrc={props.user ? props.user.avatar : null} miniSize={props.miniSize} />
      {props.user ? props.user.name : "Anonymous"}
    </div>
  );
}

/**
 * DANGEROUS scuffed function to convert XML to HTML
 * TODO: improve the rendering system to be safer
*/
function contentXMLToHTML(contentXML: string) {
  // https://api.jquery.com/jQuery.parseXML/
  let xmlDoc = $.parseXML(contentXML);
  let $xml = $(xmlDoc);
  let document = $xml.find("document");
  const res = contentXML
    .replace(/<image/g, "<img class=\"docimage\"")
    .replace(/<figure/g, "<div class=\"docfigure\"")
    .replace(/<pre/g, "<pre class=\"docpre\"")
    .replace(/<code/g, "<code class=\"doccode\"")
    .replace(/<paragraph/g, "<span class=\"docparagraph\"");
    //.replace(/<link/g, "<a class=\"doca\"")
  return res;
}

function CommentDisplay(props: {comment: ThreadComment, users: ThreadUserMap}) {
  let poster = props.users.get(props.comment.user_id);

  return (
    <div className="comment-block">
      <div className="userandtime">
        <UserDisp user={poster ? poster : null} miniSize={true} />
        <span className="smalltext">{formatDate(props.comment.created_at)}</span>
      </div>
      {/* TODO: fix this to be safer */}
      <span className="smalltext">
        <div dangerouslySetInnerHTML={{__html: contentXMLToHTML(props.comment.content)}}></div>
      </span>
      {props.comment.comments.map(
        (comment) => <CommentDisplay key={comment.id} comment={comment} users={props.users} />
      )}
    </div>
  )
}

function AnswerDisplay(props: {answer: Answer, users: ThreadUserMap}) {
  let poster = props.users.get(props.answer.user_id);

  return (
    <div>
      <div className="userandtime">
        <UserDisp user={poster ? poster : null} />
        <span className="smalltext">{formatDate(props.answer.created_at)}</span>
      </div>
      {/* TODO: fix this to be safer */}
      <div dangerouslySetInnerHTML={{__html: contentXMLToHTML(props.answer.content)}}></div>
      {props.answer.comments.map(
        (comment) => <CommentDisplay key={comment.id} comment={comment} users={props.users} />
      )}
    </div>
  )
}

function ThreadDetailsDisplay(props: {course: Course, thread: Thread, users: ThreadUserMap}) {
  const [threadDetails, setThreadDetails] = useState<ThreadDetails | null>(null);

  useEffect(() => {
    fetch(
      "/api/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseid: props.course.course.id,
          threadnumber: props.thread.number
        })
      }
    )
    .then(resp => { return resp.json() })
    .then(res => {
      setThreadDetails(res);
    });
  }, [props.thread]);

  return (
    <>
      <b>{props.thread.title}</b> #{props.thread.number}
      <div className="userandtime">
        <UserDisp user={props.thread.user} />
        <span className="smalltext">{formatDate(props.thread.created_at)}</span>
      </div>
      {/* TODO: fix this to be safer */}
      <div dangerouslySetInnerHTML={{__html: contentXMLToHTML(props.thread.content)}}></div>
      <hr />
      {threadDetails ? threadDetails.comments.map(
        (comment) => <CommentDisplay key={"" + comment.id} comment={comment} users={props.users} />
      ) : <></>}
      {threadDetails ? threadDetails.answers.map(
        (answer) => <AnswerDisplay key={answer.id} answer={answer} users={props.users} />
      ) : <></>}
    </>
  );
}

export default function DiscussionPage(props: {course: Course}) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [users, setUsers] = useState<Map<number, ThreadUser>>(new Map<number, ThreadUser>());
  const [fetching, setFetching] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  // Fetch more threads
  function fetchMore() {
    setFetching(true);
    fetch(
      "/api/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseid: props.course.course.id,
          offset: threads.length
        })
      }
    )
    .then(resp => { return resp.json() })
    .then(res => {
      setThreads(threads.concat(res.threads));
      let newUserMap = new Map(users);
      for (const u of res.users) {
        newUserMap.set(u.id, u);
      }
      setUsers(newUserMap);
      setFetching(false);
    }).catch(_err => {
      setFetching(false);
    });
  }

  useEffect(() => {
    fetchMore();
  }, []);

  return (
    <>
      <div className="page">
        <div className="discussionmain">
          <div className="left-sidebar">
            <div className="threadslist">
              {threads.map(
                (thread) => <ThreadBox
                  thread={thread}
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  selected={selectedThread ? thread.id == selectedThread.id : false}
                />
              )}
              <button disabled={fetching} onClick={fetchMore}>+ Load More</button>
            </div>
          </div>
          <div className={"section thread-details"}>
            {selectedThread ?
              <ThreadDetailsDisplay thread={selectedThread} course={props.course} users={users} />
              : <span>Nothing here yet!</span>}
          </div>
        </div>
      </div>
    </>
  );
}
