<p align="center">
  <img src="https://raw.githubusercontent.com/joecodecreations/antigravity_automation/main/src/images/icon.png" alt="Antigravity Automation" width="80">
</p>

<h1 align="center">antigravity-automation</h1>

<p align="center">
  <strong>The official Node.js SDK for the <a href="https://antigravityautomation.com">Antigravity Automation</a> extension</strong>
</p>

<p align="center">
  <a href="https://antigravityautomation.com">🌐 Website</a> &nbsp;·&nbsp;
  <a href="https://antigravityautomation.com/api/">📖 API Docs</a> &nbsp;·&nbsp;
  <a href="https://github.com/joecodecreations/antigravity_automation">⭐ GitHub</a>
</p>

---

Automate clicks, send commands, and stream live AI chat outputs from Node.js — all via the local REST API and WebSocket provided by the [Antigravity Automation](https://antigravityautomation.com) VS Code extension.

## Install

```bash
npm install antigravity-automation
```

## Quick Start

```javascript
const { AntigravityClient, AntigravityStream } = require('antigravity-automation');

const client = new AntigravityClient();

// Send a command to the AI chat
await client.sendCommand('Refactor the auth module');

// Toggle auto-click automation
await client.toggleAutoRun();

// Get usage stats
const stats = await client.getStats();
console.log(stats);
```

## WebSocket Stream

```javascript
const { AntigravityStream } = require('antigravity-automation');

const stream = new AntigravityStream();

stream.onConnected(() => console.log('Connected!'));
stream.onMessage((msg) => {
    console.log(`[${msg.title}] ${msg.content}`);
});

stream.connect();
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `sendCommand(text)` | `POST /send_command` | Send a prompt to the active AI chat |
| `startNewChat()` | `POST /start-new-chat` | Start a new chat session |
| `switchChat(title)` | `POST /switch_chat` | Switch to a conversation by title |
| `toggleAutoRun()` | `POST /toggle_auto_run` | Toggle auto-click Run button |
| `toggleAutoAllow()` | `POST /toggle_auto_allow` | Toggle auto-approve permissions |
| `getCommand()` | `GET /get_command` | Poll for queued commands & state |
| `getStats()` | `GET /stats` | Get cumulative usage statistics |
| `update(title, content)` | `POST /update` | Push chat content |
| `trackAction(action)` | `POST /track_action` | Track a usage action |

## Configuration

```javascript
const client = new AntigravityClient({
    baseUrl: 'http://localhost:5000',  // default
    timeout: 10000,                     // ms, default
});

const stream = new AntigravityStream({
    url: 'ws://localhost:9812',  // default
    reconnect: true,              // auto-reconnect, default
    reconnectDelay: 3000,         // ms, default
});
```

## Local Development

```bash
npm run link:local     # Build + npm link for local testing
npm test               # Run offline import tests
npm run test:live      # Run live tests (bridge must be running)
```

## Requirements

- **Node.js** ≥ 16
- **Antigravity Automation** extension installed and running in VS Code

## License

MIT — Built by [JoeCodeCreations](https://github.com/joecodecreations)
