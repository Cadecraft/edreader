use edstem;
use dotenv::dotenv;
use tokio;
use axum::{
    routing::{get, post},
    Json, Router
};
use serde::{Deserialize, Serialize};
mod user;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let client = edstem::Client::new(&std::env::var("EDSTEM_API_KEY").expect("The API key must be defined"));
    // Test the client
    let user_email = client.get_self_user().await.expect("Expected self user").user().email().clone();
    println!("Created client with email {}", user_email);

    // The server (see <https://github.com/tokio-rs/axum>)

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        .route("/rootinfo", get(root))
        // `POST /users` goes to `create_user`
        .route("/selfuserinfo", get(user::get_self_user_info))
        .with_state(client);

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
    
    println!("Getting root");
    "Hello, World!"
}
