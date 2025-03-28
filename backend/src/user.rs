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

// Reference:
/*pub async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    State(state): State<edstem::Client>,
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    println!("Creating user");
    // insert your application logic here
    let user = User {
        avatar: String::from(DEFAULT_AVATAR),
        email: String::from("e@e.com"),
        username: payload.username,
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
pub struct CreateUser {
    username: String,
}*/

