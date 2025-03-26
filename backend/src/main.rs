use edstem;
use dotenv::dotenv;
use std::env;
use tokio;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let client = edstem::Client::new(&std::env::var("EDSTEM_API_KEY").expect("The API key must be defined"));
    // DBG: Test the client
    println!("DBG: created client");
    println!("DBG: self email: {}", client.get_self_user().await.expect("Expected self user").user().email());
}
