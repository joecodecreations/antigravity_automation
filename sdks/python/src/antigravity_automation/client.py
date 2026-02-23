"""REST API client for the Antigravity Automation bridge."""

from typing import Optional
import requests

from .types import (
    ToggleResponse,
    SendCommandResponse,
    StartNewChatResponse,
    SwitchChatResponse,
    GetCommandResponse,
    UpdateResponse,
    StatsResponse,
    TrackActionResponse,
    RemoteUsageSummary,
    UsageInfo,
)


class AntigravityClient:
    """Client for the Antigravity Automation REST API.

    Args:
        base_url: HTTP base URL (default: http://localhost:5000)
        timeout: Request timeout in seconds (default: 10)
    """

    def __init__(self, base_url: str = "http://localhost:5000", timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self._session = requests.Session()
        self._session.headers.update({"Content-Type": "application/json"})

    # ── Private helpers ─────────────────────────

    def _post(self, path: str, json_body: Optional[dict] = None) -> dict:
        r = self._session.post(f"{self.base_url}{path}", json=json_body, timeout=self.timeout)
        r.raise_for_status()
        return r.json()

    def _get(self, path: str) -> dict:
        r = self._session.get(f"{self.base_url}{path}", timeout=self.timeout)
        r.raise_for_status()
        return r.json()

    # ── Automation ──────────────────────────────

    def toggle_auto_run(self) -> ToggleResponse:
        """Toggle Auto-Run click automation."""
        data = self._post("/toggle_auto_run")
        return ToggleResponse(**{k: v for k, v in data.items() if k in ToggleResponse.__dataclass_fields__})

    def toggle_auto_allow(self) -> ToggleResponse:
        """Toggle Auto-Allow permission automation."""
        data = self._post("/toggle_auto_allow")
        return ToggleResponse(**{k: v for k, v in data.items() if k in ToggleResponse.__dataclass_fields__})

    # ── Remote Control ──────────────────────────

    def send_command(self, text: str) -> SendCommandResponse:
        """Send a prompt/command to the active AI chat."""
        data = self._post("/send_command", {"text": text})
        usage = RemoteUsageSummary(**data.pop("usage")) if "usage" in data else None
        return SendCommandResponse(status=data.get("status", ""), position=data.get("position", 0), usage=usage)

    def start_new_chat(self) -> StartNewChatResponse:
        """Start a new chat session."""
        data = self._post("/start-new-chat")
        return StartNewChatResponse(status=data.get("status", ""))

    def switch_chat(self, title: str) -> SwitchChatResponse:
        """Switch to an existing chat by title."""
        data = self._post("/switch_chat", {"title": title})
        usage = RemoteUsageSummary(**data.pop("usage")) if "usage" in data else None
        return SwitchChatResponse(status=data.get("status", ""), title=data.get("title", ""), usage=usage)

    # ── Content ─────────────────────────────────

    def get_command(self) -> GetCommandResponse:
        """Poll for queued commands and current state."""
        data = self._get("/get_command")
        usage = UsageInfo(**data.pop("usage")) if "usage" in data else None
        return GetCommandResponse(
            text=data.get("text"),
            status=data.get("status", ""),
            auto_run=data.get("auto_run", False),
            auto_allow=data.get("auto_allow", False),
            start_new_chat=data.get("start_new_chat", False),
            switch_chat=data.get("switch_chat"),
            usage=usage,
        )

    def update(self, title: str, content: str) -> UpdateResponse:
        """Push chat content (internal webhook)."""
        data = self._post("/update", {"title": title, "content": content})
        return UpdateResponse(status=data.get("status", ""))

    # ── Stats ───────────────────────────────────

    def get_stats(self) -> StatsResponse:
        """Get cumulative usage statistics."""
        data = self._get("/stats")
        return StatsResponse(**{k: v for k, v in data.items() if k in StatsResponse.__dataclass_fields__})

    def track_action(self, action: str) -> TrackActionResponse:
        """Track a usage action: 'auto_run' | 'auto_allow' | 'remote_command'"""
        data = self._post("/track_action", {"action": action})
        stats = StatsResponse(**data["stats"]) if "stats" in data else None
        return TrackActionResponse(status=data.get("status", ""), stats=stats)
