// Antigravity Automation API — C# Code Samples
// Requires: .NET 6+ (HttpClient is built-in)
// For WebSocket: System.Net.WebSockets (built-in)

using System.Net.Http.Json;
using System.Text.Json;

const string BaseUrl = "http://localhost:5000";
var http = new HttpClient();

// ── Automation ──────────────────────────────────────

// Toggle Auto-Run
var res = await http.PostAsync($"{BaseUrl}/toggle_auto_run", null);
Console.WriteLine($"Auto-Run: {await res.Content.ReadAsStringAsync()}");

// Toggle Auto-Allow
res = await http.PostAsync($"{BaseUrl}/toggle_auto_allow", null);
Console.WriteLine($"Auto-Allow: {await res.Content.ReadAsStringAsync()}");

// ── Remote Control ──────────────────────────────────

// Send Command
res = await http.PostAsJsonAsync($"{BaseUrl}/send_command", new { text = "Refactor the auth module" });
Console.WriteLine($"Command: {await res.Content.ReadAsStringAsync()}");

// Start New Chat
res = await http.PostAsync($"{BaseUrl}/start-new-chat", null);
Console.WriteLine($"New chat: {await res.Content.ReadAsStringAsync()}");

// Switch Chat
res = await http.PostAsJsonAsync($"{BaseUrl}/switch_chat", new { title = "Refactoring Auth Module" });
Console.WriteLine($"Switch: {await res.Content.ReadAsStringAsync()}");

// ── Content ─────────────────────────────────────────

// Get Command (poll)
var state = await http.GetStringAsync($"{BaseUrl}/get_command");
Console.WriteLine($"State: {state}");

// Push Update
res = await http.PostAsJsonAsync($"{BaseUrl}/update", new { title = "Debug Session", content = "User: fix bug\nAssistant: ..." });
Console.WriteLine($"Update: {await res.Content.ReadAsStringAsync()}");

// ── Stats ───────────────────────────────────────────

// Get Stats
var stats = await http.GetStringAsync($"{BaseUrl}/stats");
Console.WriteLine($"Stats: {stats}");

// Track Action
res = await http.PostAsJsonAsync($"{BaseUrl}/track_action", new { action = "auto_run" });
Console.WriteLine($"Tracked: {await res.Content.ReadAsStringAsync()}");

// ── WebSocket Stream ────────────────────────────────
// using System.Net.WebSockets;
// using var ws = new ClientWebSocket();
// await ws.ConnectAsync(new Uri("ws://localhost:9812"), CancellationToken.None);
// var buffer = new byte[4096];
// while (ws.State == WebSocketState.Open) {
//     var result = await ws.ReceiveAsync(buffer, CancellationToken.None);
//     var msg = System.Text.Encoding.UTF8.GetString(buffer, 0, result.Count);
//     Console.WriteLine(msg);
// }
