import { useState, useEffect } from 'react';
import './../App.css'
import './DiscussionPage.css'
import { Course, Thread } from './../types'

function ThreadBox(props: {thread: Thread}) {
  return (
    <div className="thread">
      <b>{props.thread.title}</b>
      <br />
      {props.thread.category} • {props.thread.user ? props.thread.user.name : "Anonymous"}
    </div>
  );
}

export default function DiscussionPage(props: {course: Course}) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [fetching, setFetching] = useState(false);

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
      setThreads(threads.concat(res))
      setFetching(false);
    }).catch(err => {
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
                (thread) => <ThreadBox thread={thread} key={thread.id} />
              )}
              <button disabled={fetching} onClick={fetchMore}>+ Load More</button>
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
