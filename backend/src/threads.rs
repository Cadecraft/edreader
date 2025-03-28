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
    courseid: u64
}

pub async fn get_threads(
    State(client): State<edstem::Client>,
    Json(payload): Json<GetThreads>,
) -> (StatusCode, Response) {
    let threads = client.get_course_threads(payload.courseid).await.expect("Could not get course threads");
    println!("{} threads found", threads.threads().len());

    (StatusCode::OK, Json(threads.threads()).into_response())
}
