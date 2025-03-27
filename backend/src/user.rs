use edstem;
use axum::{http::StatusCode, Json, extract::State};
use serde::{Serialize};

const DEFAULT_AVATAR: &str = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg/250px-Balantiocheilos_melanopterus_-_Karlsruhe_Zoo_02_%28cropped%29.jpg";

#[derive(Serialize)]
pub struct User {
    name: String,
    avatar: String,
    email: String,
    username: String,
}

pub async fn get_self_user_info(
    State(state): State<edstem::Client>,
) -> (StatusCode, Json<User>) {
    let user = state.get_self_user().await.expect("Could not get user");
    //let em = user.email();
    let res = User {
        name: user.user().name().clone(),
        avatar: user.user().avatar().clone().unwrap_or(String::from(DEFAULT_AVATAR)),
        email: user.user().email().to_string(),
        username: user.user().username().clone().unwrap_or(String::from("No username"))
    };

    (StatusCode::OK, Json(res))
}

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

