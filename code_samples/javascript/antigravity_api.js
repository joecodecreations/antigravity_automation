/**
 * Antigravity Automation API — JavaScript (Node.js) Code Samples
 * Works with Node 18+ (native fetch) or install: npm install node-fetch ws
 */

const BASE_URL = "http://localhost:5000";

// ── Automation ──────────────────────────────────────

async function toggleAutoRun() {
    const res = await fetch(`${BASE_URL}/toggle_auto_run`, { method: "POST" });
    const data = await res.json();
    console.log("Auto-Run:", data); // { auto_run: true }
}

async function toggleAutoAllow() {
    const res = await fetch(`${BASE_URL}/toggle_auto_allow`, { method: "POST" });
    const data = await res.json();
    console.log("Auto-Allow:", data); // { auto_allow: true }
}

// ── Remote Control ──────────────────────────────────

async function sendCommand(text) {
    const res = await fetch(`${BASE_URL}/send_command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    const data = await res.json();
    console.log("Command:", data); // { status: "queued", position: 1 }
}

async function startNewChat() {
    const res = await fetch(`${BASE_URL}/start-new-chat`, { method: "POST" });
    const data = await res.json();
    console.log("New chat:", data); // { status: "queued_new_chat" }
}

async function switchChat(title) {
    const res = await fetch(`${BASE_URL}/switch_chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    const data = await res.json();
    console.log("Switch:", data);
}

// ── Content ─────────────────────────────────────────

async function getCommand() {
    const res = await fetch(`${BASE_URL}/get_command`);
    const data = await res.json();
    console.log("State:", data);
}

async function pushUpdate(title, content) {
    const res = await fetch(`${BASE_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    console.log("Update:", data); // { status: "received" }
}

// ── Stats ───────────────────────────────────────────

async function getStats() {
    const res = await fetch(`${BASE_URL}/stats`);
    const data = await res.json();
    console.log("Stats:", data);
}

async function trackAction(action) {
    const res = await fetch(`${BASE_URL}/track_action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }), // "auto_run" | "auto_allow" | "remote_command"
    });
    const data = await res.json();
    console.log("Tracked:", data);
}

// ── WebSocket Stream ────────────────────────────────

function watchStream() {
    // Browser: use native WebSocket. Node: npm install ws
    const WebSocket = require("ws");
    const ws = new WebSocket("ws://localhost:9812");

    ws.on("open", () => console.log("Connected to Antigravity stream"));
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);
        console.log(`[${data.title}] ${data.content.substring(0, 100)}...`);
    });
    ws.on("error", (err) => console.error("WS error:", err.message));
}

// ── Run examples ────────────────────────────────────

(async () => {
    await toggleAutoRun();
    await sendCommand("Refactor the auth module and add unit tests");
    await getStats();
    // watchStream(); // Uncomment to listen to live stream
})();
