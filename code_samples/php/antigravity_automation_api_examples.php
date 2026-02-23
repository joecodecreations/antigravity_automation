<?php
/**
 * Antigravity Automation API — PHP Code Samples
 * Requires: PHP 7.4+ with cURL extension (built-in)
 */

$BASE_URL = "http://localhost:5000";

function api_post(string $endpoint, ?array $body = null): array {
    global $BASE_URL;
    $ch = curl_init("$BASE_URL$endpoint");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    if ($body) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }
    $response = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($response, true);
    echo "$endpoint → " . json_encode($data) . "\n";
    return $data;
}

function api_get(string $endpoint): array {
    global $BASE_URL;
    $response = file_get_contents("$BASE_URL$endpoint");
    $data = json_decode($response, true);
    echo "$endpoint → " . json_encode($data) . "\n";
    return $data;
}

// ── Automation ──────────────────────────────────────
api_post("/toggle_auto_run");
api_post("/toggle_auto_allow");

// ── Remote Control ──────────────────────────────────
api_post("/send_command",  ["text" => "Refactor the auth module"]);
api_post("/start-new-chat");
api_post("/switch_chat",   ["title" => "Refactoring Auth Module"]);

// ── Content ─────────────────────────────────────────
api_get("/get_command");
api_post("/update", [
    "title"   => "Debug Session",
    "content" => "User: fix the bug\nAssistant: ..."
]);

// ── Stats ───────────────────────────────────────────
api_get("/stats");
api_post("/track_action", ["action" => "auto_run"]);

// ── WebSocket Stream ────────────────────────────────
// For PHP WebSocket, use: composer require textalk/websocket
//
// use WebSocket\Client;
// $client = new Client("ws://localhost:9812");
// while (true) {
//     $msg = $client->receive();
//     $data = json_decode($msg, true);
//     echo "[{$data['title']}] {$data['content']}\n";
// }
