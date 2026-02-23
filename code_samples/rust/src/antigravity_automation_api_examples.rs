//! Antigravity Automation API — Rust Code Samples
//! Add to Cargo.toml:
//!   reqwest = { version = "0.12", features = ["json"] }
//!   tokio = { version = "1", features = ["full"] }
//!   serde_json = "1"
//!   tungstenite = "0.24"

use reqwest::Client;
use serde_json::{json, Value};

const BASE_URL: &str = "http://localhost:5000";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();

    // ── Automation ──────────────────────────────
    // Toggle Auto-Run
    let res: Value = client.post(format!("{BASE_URL}/toggle_auto_run"))
        .send().await?.json().await?;
    println!("Auto-Run: {}", res);

    // Toggle Auto-Allow
    let res: Value = client.post(format!("{BASE_URL}/toggle_auto_allow"))
        .send().await?.json().await?;
    println!("Auto-Allow: {}", res);

    // ── Remote Control ──────────────────────────
    // Send Command
    let res: Value = client.post(format!("{BASE_URL}/send_command"))
        .json(&json!({"text": "Refactor the auth module"}))
        .send().await?.json().await?;
    println!("Command: {}", res);

    // Start New Chat
    let res: Value = client.post(format!("{BASE_URL}/start-new-chat"))
        .send().await?.json().await?;
    println!("New chat: {}", res);

    // Switch Chat
    let res: Value = client.post(format!("{BASE_URL}/switch_chat"))
        .json(&json!({"title": "Refactoring Auth Module"}))
        .send().await?.json().await?;
    println!("Switch: {}", res);

    // ── Content ─────────────────────────────────
    // Get Command (poll)
    let res: Value = client.get(format!("{BASE_URL}/get_command"))
        .send().await?.json().await?;
    println!("State: {}", res);

    // Push Update
    let res: Value = client.post(format!("{BASE_URL}/update"))
        .json(&json!({"title": "Debug Session", "content": "User: fix the bug\nAssistant: ..."}))
        .send().await?.json().await?;
    println!("Update: {}", res);

    // ── Stats ───────────────────────────────────
    // Get Stats
    let res: Value = client.get(format!("{BASE_URL}/stats"))
        .send().await?.json().await?;
    println!("Stats: {}", res);

    // Track Action
    let res: Value = client.post(format!("{BASE_URL}/track_action"))
        .json(&json!({"action": "auto_run"}))
        .send().await?.json().await?;
    println!("Tracked: {}", res);

    Ok(())
}

// ── WebSocket Stream (using tungstenite) ────────────
// use tungstenite::connect;
// fn watch_stream() {
//     let (mut ws, _) = connect("ws://localhost:9812").expect("Failed to connect");
//     println!("Connected to Antigravity stream");
//     loop {
//         let msg = ws.read().expect("Read error");
//         println!("{}", msg);
//     }
// }
