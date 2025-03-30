use edstem;
use axum::{
    http::StatusCode,
    extract::State,
    Json,
    response::{
        Response,
        IntoResponse
    }
};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct GetThreads {
    courseid: u64,
    offset: u64
}

pub async fn get_threads(
    State(client): State<edstem::Client>,
    Json(payload): Json<GetThreads>,
) -> (StatusCode, Response) {
    let threads = client.get_course_threads(
        payload.courseid, Some(edstem::opts::GetCourseThreadsOptions {
            limit: 20,
            offset: payload.offset,
            filter: None,
            sort: edstem::opts::GetCourseThreadsSortKey::New
        })
    ).await.expect("Could not get course threads");

    (StatusCode::OK, Json(threads).into_response())
}

#[derive(Deserialize)]
pub struct GetThread {
    courseid: u64,
    threadnumber: u64
}

pub async fn get_thread(
    State(client): State<edstem::Client>,
    Json(payload): Json<GetThread>
) -> (StatusCode, Response) {
    let thread = client.get_thread_by_number(payload.courseid, payload.threadnumber)
        .await.expect("Could not get thread");

    (StatusCode::OK, Json(thread.thread()).into_response())
}
