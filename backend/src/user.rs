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

pub async fn get_self_user_info(
    State(client): State<edstem::Client>,
) -> (StatusCode, Response) {
    let user = client.get_self_user().await.expect("Could not get user");

    (StatusCode::OK, Json(user.user()).into_response())
}

pub async fn get_self_user_courses(
    State(client): State<edstem::Client>,
) -> (StatusCode, Response) {
    let user = client.get_self_user().await.expect("Could not get user");

    (StatusCode::OK, Json(user.courses()).into_response())
}
