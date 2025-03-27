use edstem;
use dotenv::dotenv;
use tokio;
use axum::{ routing::get, Router };
mod user;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let edstem_api_key = &std::env::var("EDSTEM_API_KEY").expect("The API key (EDSTEM_API_KEY) must be defined in the .env file");
    let client = edstem::Client::new(edstem_api_key);
    // Test the client
    let user_email = client.get_self_user().await.expect("Expected self user").user().email().clone();
    println!("Created client with email {}", user_email);

    // Build the routes for the server (see <https://github.com/tokio-rs/axum>)
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // Getting info about users
        .route("/selfuserinfo", get(user::get_self_user_info))
        .with_state(client);

    // Run the app with hyper, listening globally
    let server_url = &std::env::var("SERVER_URL").expect("The URL to run the server on (SERVER_URL) must be defined in the .env file");
    let listener = tokio::net::TcpListener::bind(server_url).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// Basic handler that responds with a static string
async fn root() -> &'static str {
    println!("Getting root");
    "Hello, World!"
}
