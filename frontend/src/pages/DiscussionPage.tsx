import { useState, useEffect } from 'react';
import './../App.css'
import './DiscussionPage.css'
import { Course, Thread, ThreadDetails, ThreadUser } from './../types'
import AvatarImage from './../components/AvatarImage'

/** Format a date based on a time string provided by the API */
function formatDate(time: string) {
  return time.substring(0, 4) + "/" + time.substring(5, 7) + "/" + time.substring(8, 10);
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

function UserDisp(props: {user: ThreadUser | null}) {
  return (
    <div className="userdisp-container">
      <AvatarImage avatarSrc={props.user ? props.user.avatar : null}/>
      {props.user ? props.user.name : "Anonymous"}
    </div>
  );
}

/**
 * DANGEROUS scuffed function to convert XML to HTML
 * TODO: improve the rendering system to be safer
*/
function contentXMLToHTML(contentXML: string) {
  const res = contentXML
    .replace(/<image/g, "<img class=\"docimage\"")
    .replace(/<figure/g, "<div class=\"docfigure\"")
    .replace(/<pre/g, "<pre class=\"docpre\"")
    .replace(/<code/g, "<code class=\"doccode\"")
    .replace(/<paragraph/g, "<span class=\"docparagraph\"");
  return res;
}

function ThreadDetailsDisplay(props: {course: Course, thread: Thread}) {
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
      <UserDisp user={props.thread.user} />
      {/* TODO: fix this to be safer */}
      <div dangerouslySetInnerHTML={{__html: contentXMLToHTML(props.thread.content)}}></div>
      <hr />
    </>
  );
}

export default function DiscussionPage(props: {course: Course}) {
  const [threads, setThreads] = useState<Thread[]>([]);
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
      setThreads(threads.concat(res));
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
              <ThreadDetailsDisplay thread={selectedThread} course={props.course} />
              : <span>Nothing here yet!</span>}
          </div>
        </div>
      </div>
    </>
  );
}
