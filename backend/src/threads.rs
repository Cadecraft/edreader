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
    println!("{} threads found, starting at {}", threads.threads().len(), payload.offset);

    (StatusCode::OK, Json(threads.threads()).into_response())
}
