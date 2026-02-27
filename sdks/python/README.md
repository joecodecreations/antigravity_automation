<p align="center">
  <img src="https://raw.githubusercontent.com/joecodecreations/antigravity_automation/main/src/images/icon.png" alt="Antigravity Automation" width="80">
</p>

<h1 align="center">antigravity-automation</h1>

<p align="center">
  <strong>The official Python SDK for the <a href="https://antigravityautomation.com">Antigravity Automation</a> extension</strong>
</p>

<p align="center">
  <a href="https://antigravityautomation.com">🌐 Website</a> &nbsp;·&nbsp;
  <a href="https://antigravityautomation.com/api/">📖 API Docs</a> &nbsp;·&nbsp;
  <a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation">⬇️ Install Extension</a> &nbsp;·&nbsp;
  <a href="https://github.com/joecodecreations/antigravity_automation">⭐ GitHub</a>
</p>

---

<br>

<table align="center">
<tr>
<td align="center">

### 🚨 PREREQUISITE — Extension Required

**This SDK connects to the [Antigravity Automation](https://antigravityautomation.com) VS Code extension.**
**You MUST install the extension first — the SDK does not work without it.**

<br>

<a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation">
  <img src="https://img.shields.io/badge/⬇️_Install_Extension-Open_VSX-blue?style=for-the-badge&logoColor=white" alt="Install Extension">
</a>

</td>
</tr>
</table>

<br>

---

Automate clicks, send commands, and stream live AI chat outputs from Python — all via the local REST API and WebSocket provided by the [Antigravity Automation](https://antigravityautomation.com) VS Code extension.

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

# Toggle auto-click automation
client.toggle_auto_run()

# Get usage stats
stats = client.get_stats()
print(f"Auto-Run clicks: {stats.autoRunClicks}")
```

## WebSocket Stream

```python
from antigravity_automation import AntigravityStream

stream = AntigravityStream()
stream.on_message(lambda msg: print(f"[{msg['title']}] {msg['content'][:80]}..."))
stream.on_connected(lambda: print("Connected!"))
stream.run()  # Blocking — runs asyncio event loop
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `send_command(text)` | `POST /send_command` | Send a prompt to the active AI chat |
| `start_new_chat()` | `POST /start-new-chat` | Start a new chat session |
| `switch_chat(title)` | `POST /switch_chat` | Switch to a conversation by title |
| `toggle_auto_run()` | `POST /toggle_auto_run` | Toggle auto-click Run button |
| `toggle_auto_allow()` | `POST /toggle_auto_allow` | Toggle auto-approve permissions |
| `get_command()` | `GET /get_command` | Poll for queued commands & state |
| `get_stats()` | `GET /stats` | Get cumulative usage statistics |
| `update(title, content)` | `POST /update` | Push chat content |
| `track_action(action)` | `POST /track_action` | Track a usage action |

## Configuration

```python
client = AntigravityClient(
    base_url="http://localhost:5000",  # default
    timeout=10,                         # seconds, default
)

stream = AntigravityStream(
    url="ws://localhost:9812",   # default
    reconnect=True,              # auto-reconnect, default
    reconnect_delay=3.0,         # seconds, default
)
```

## Local Development

```bash
pip install -e ".[dev]"          # Install in dev mode
python tests/test_import.py      # Run offline import tests
python tests/test_live.py        # Run live tests (bridge must be running)
python -m build                  # Build for PyPI
twine upload dist/*              # Publish to PyPI
```

## Requirements

- **Python** ≥ 3.8
- **[Antigravity Automation](https://open-vsx.org/extension/joecodecreations/antigravity-automation)** extension installed and running in VS Code

## License

MIT — Built by [JoeCodeCreations](https://github.com/joecodecreations)
