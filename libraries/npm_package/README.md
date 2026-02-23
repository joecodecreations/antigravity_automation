# antigravity-automation

> Node.js client library for the [Antigravity Automation](https://antigravityautomation.com) API — automate clicks, send commands, and stream live AI chat outputs.

## Install

```bash
npm install antigravity-automation
```

## Quick Start

```javascript
const { AntigravityClient, AntigravityStream } = require('antigravity-automation');

// REST API client
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

## API Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| `sendCommand(text)` | POST /send_command | Send a prompt to the active chat |
| `startNewChat()` | POST /start-new-chat | Start a new chat session |
| `switchChat(title)` | POST /switch_chat | Switch to a chat by title |
| `toggleAutoRun()` | POST /toggle_auto_run | Toggle auto-click Run |
| `toggleAutoAllow()` | POST /toggle_auto_allow | Toggle auto-approve |
| `getCommand()` | GET /get_command | Poll for queued commands |
| `getStats()` | GET /stats | Get usage statistics |
| `update(title, content)` | POST /update | Push chat content |
| `trackAction(action)` | POST /track_action | Track a usage action |

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
# Link locally for testing
npm run link:local

# In another project:
npm link antigravity-automation

# Run offline tests
npm test

# Run live tests (requires bridge running)
npm run test:live
```

## License

MIT
