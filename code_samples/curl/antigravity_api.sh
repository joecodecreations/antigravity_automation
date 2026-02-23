#!/usr/bin/env bash
# Antigravity Automation API — cURL / Shell Code Samples
# Works on any system with curl and jq installed

BASE_URL="http://localhost:5000"

echo "=== Automation ==="

# Toggle Auto-Run
echo "--- Toggle Auto-Run ---"
curl -s -X POST "$BASE_URL/toggle_auto_run" | jq .

# Toggle Auto-Allow
echo "--- Toggle Auto-Allow ---"
curl -s -X POST "$BASE_URL/toggle_auto_allow" | jq .


echo "=== Remote Control ==="

# Send Command
echo "--- Send Command ---"
curl -s -X POST "$BASE_URL/send_command" \
  -H "Content-Type: application/json" \
  -d '{"text": "Refactor the auth module"}' | jq .

# Start New Chat
echo "--- Start New Chat ---"
curl -s -X POST "$BASE_URL/start-new-chat" | jq .

# Switch Chat
echo "--- Switch Chat ---"
curl -s -X POST "$BASE_URL/switch_chat" \
  -H "Content-Type: application/json" \
  -d '{"title": "Refactoring Auth Module"}' | jq .


echo "=== Content ==="

# Get Command (poll)
echo "--- Get Command ---"
curl -s "$BASE_URL/get_command" | jq .

# Push Update
echo "--- Push Update ---"
curl -s -X POST "$BASE_URL/update" \
  -H "Content-Type: application/json" \
  -d '{"title": "Debug Session", "content": "User: fix the bug\nAssistant: ..."}' | jq .


echo "=== Stats ==="

# Get Stats
echo "--- Get Stats ---"
curl -s "$BASE_URL/stats" | jq .

# Track Action
echo "--- Track Action ---"
curl -s -X POST "$BASE_URL/track_action" \
  -H "Content-Type: application/json" \
  -d '{"action": "auto_run"}' | jq .


# === WebSocket Stream ===
# Use websocat (cargo install websocat) or wscat (npm install -g wscat):
#
# websocat ws://localhost:9812
# wscat -c ws://localhost:9812
