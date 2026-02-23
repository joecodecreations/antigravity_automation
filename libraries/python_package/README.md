# antigravity-automation (Python)

> Python client library for the [Antigravity Automation](https://antigravityautomation.com) API — automate clicks, send commands, and stream live AI chat outputs.

## Install

```bash
pip install antigravity-automation
```

## Quick Start

```python
from antigravity_automation import AntigravityClient

client = AntigravityClient()

# Send a command to the AI chat
result = client.send_command("Refactor the auth module")
print(result)  # SendCommandResponse(status='queued', position=1, ...)

# Toggle auto-click
client.toggle_auto_run()

# Get stats
stats = client.get_stats()
print(f"Auto-Run clicks: {stats.autoRunClicks}")
```

## WebSocket Stream

```python
from antigravity_automation import AntigravityStream

stream = AntigravityStream()
stream.on_message(lambda msg: print(f"[{msg['title']}] {msg['content'][:80]}..."))
stream.on_connected(lambda: print("Connected!"))
stream.run()  # Blocking — runs asyncio loop
```

## API Methods

| Method | Endpoint | Description |
|--------|----------|-------------|
| `send_command(text)` | POST /send_command | Send a prompt to the active chat |
| `start_new_chat()` | POST /start-new-chat | Start a new chat session |
| `switch_chat(title)` | POST /switch_chat | Switch to a chat by title |
| `toggle_auto_run()` | POST /toggle_auto_run | Toggle auto-click Run |
| `toggle_auto_allow()` | POST /toggle_auto_allow | Toggle auto-approve |
| `get_command()` | GET /get_command | Poll for queued commands |
| `get_stats()` | GET /stats | Get usage statistics |
| `update(title, content)` | POST /update | Push chat content |
| `track_action(action)` | POST /track_action | Track a usage action |

## Configuration

```python
client = AntigravityClient(base_url="http://localhost:5000", timeout=10)

stream = AntigravityStream(
    url="ws://localhost:9812",
    reconnect=True,
    reconnect_delay=3.0,
)
```

## Local Development

```bash
# Install in dev mode
pip install -e ".[dev]"

# Run offline tests
python tests/test_import.py

# Run live tests (bridge must be running)
python tests/test_live.py

# Build for PyPI
python -m build

# Upload to PyPI
twine upload dist/*
```

## License

MIT
