// Antigravity Automation API — Go Code Samples
// Requires: go get github.com/gorilla/websocket
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const baseURL = "http://localhost:5000"

func post(endpoint string, body map[string]string) {
	payload, _ := json.Marshal(body)
	resp, err := http.Post(baseURL+endpoint, "application/json", bytes.NewBuffer(payload))
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	fmt.Printf("%s → %s\n", endpoint, string(data))
}

func get(endpoint string) {
	resp, err := http.Get(baseURL + endpoint)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	fmt.Printf("%s → %s\n", endpoint, string(data))
}

func main() {
	// ── Automation ──────────────────────────────
	post("/toggle_auto_run", nil)
	post("/toggle_auto_allow", nil)

	// ── Remote Control ──────────────────────────
	post("/send_command", map[string]string{"text": "Refactor the auth module"})
	post("/start-new-chat", nil)
	post("/switch_chat", map[string]string{"title": "Refactoring Auth Module"})

	// ── Content ─────────────────────────────────
	get("/get_command")
	post("/update", map[string]string{
		"title":   "Debug Session",
		"content": "User: fix the bug\nAssistant: ...",
	})

	// ── Stats ───────────────────────────────────
	get("/stats")
	post("/track_action", map[string]string{"action": "auto_run"})
}

// ── WebSocket Stream ────────────────────────────────
// import "github.com/gorilla/websocket"
//
// func watchStream() {
//     c, _, err := websocket.DefaultDialer.Dial("ws://localhost:9812", nil)
//     if err != nil { log.Fatal(err) }
//     defer c.Close()
//     for {
//         _, msg, err := c.ReadMessage()
//         if err != nil { log.Fatal(err) }
//         fmt.Println(string(msg))
//     }
// }
