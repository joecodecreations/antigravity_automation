"""
Antigravity Automation API — Python Code Samples
Requires: pip install requests websockets
"""
import requests
import asyncio
import websockets
import json

BASE_URL = "http://localhost:5000"


# ── Automation ────────────────────────────────────────

def toggle_auto_run():
    """Toggle the Auto-Run click automation."""
    r = requests.post(f"{BASE_URL}/toggle_auto_run")
    print(r.json())  # {"auto_run": true}

def toggle_auto_allow():
    """Toggle the Auto-Allow permission automation."""
    r = requests.post(f"{BASE_URL}/toggle_auto_allow")
    print(r.json())  # {"auto_allow": true}


# ── Remote Control ────────────────────────────────────

def send_command(text: str):
    """Send a prompt/command to the active AI chat."""
    r = requests.post(f"{BASE_URL}/send_command", json={"text": text})
    print(r.json())  # {"status": "queued", "position": 1, "usage": {...}}

def start_new_chat():
    """Start a brand-new chat session."""
    r = requests.post(f"{BASE_URL}/start-new-chat")
    print(r.json())  # {"status": "queued_new_chat"}

def switch_chat(title: str):
    """Switch to an existing chat by title."""
    r = requests.post(f"{BASE_URL}/switch_chat", json={"title": title})
    print(r.json())  # {"status": "queued", "title": "...", "usage": {...}}


# ── Content ───────────────────────────────────────────

def get_command():
    """Poll for the next queued command and current state."""
    r = requests.get(f"{BASE_URL}/get_command")
    print(r.json())

def push_update(title: str, content: str):
    """Push chat content (used internally by the bridge)."""
    r = requests.post(f"{BASE_URL}/update", json={"title": title, "content": content})
    print(r.json())  # {"status": "received"}


# ── Stats ─────────────────────────────────────────────

def get_stats():
    """Retrieve cumulative usage statistics."""
    r = requests.get(f"{BASE_URL}/stats")
    print(r.json())

def track_action(action: str):
    """Track a usage action: auto_run | auto_allow | remote_command"""
    r = requests.post(f"{BASE_URL}/track_action", json={"action": action})
    print(r.json())  # {"status": "tracked", "stats": {...}}


# ── WebSocket Stream ──────────────────────────────────

async def watch_stream():
    """Stream live chat outputs via WebSocket."""
    async with websockets.connect("ws://localhost:9812") as ws:
        print("Connected to Antigravity stream...")
        while True:
            data = json.loads(await ws.recv())
            print(f"[{data['title']}] {data['content'][:100]}...")


# ── Run examples ──────────────────────────────────────

if __name__ == "__main__":
    toggle_auto_run()
    send_command("Refactor the auth module and add unit tests")
    get_stats()
    # asyncio.run(watch_stream())  # Uncomment to listen to live stream
