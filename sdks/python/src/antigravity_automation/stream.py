"""WebSocket stream client for live chat outputs."""

import asyncio
import json
from typing import Callable, Optional
import websockets


class AntigravityStream:
    """Async WebSocket stream for real-time Antigravity chat outputs.

    Args:
        url: WebSocket URL (default: ws://localhost:9812)
        reconnect: Auto-reconnect on disconnect (default: True)
        reconnect_delay: Reconnect delay in seconds (default: 3)
    """

    def __init__(
        self,
        url: str = "ws://localhost:9812",
        reconnect: bool = True,
        reconnect_delay: float = 3.0,
    ):
        self.url = url
        self.reconnect = reconnect
        self.reconnect_delay = reconnect_delay
        self._on_message: Optional[Callable] = None
        self._on_connected: Optional[Callable] = None
        self._on_disconnected: Optional[Callable] = None
        self._on_error: Optional[Callable] = None
        self._running = False

    def on_message(self, handler: Callable[[dict], None]) -> "AntigravityStream":
        """Set handler for incoming messages. Message is dict with 'title' and 'content'."""
        self._on_message = handler
        return self

    def on_connected(self, handler: Callable[[], None]) -> "AntigravityStream":
        """Set handler for connection established."""
        self._on_connected = handler
        return self

    def on_disconnected(self, handler: Callable[[], None]) -> "AntigravityStream":
        """Set handler for disconnection."""
        self._on_disconnected = handler
        return self

    def on_error(self, handler: Callable[[Exception], None]) -> "AntigravityStream":
        """Set handler for errors."""
        self._on_error = handler
        return self

    async def connect(self):
        """Connect and listen to the stream (async)."""
        self._running = True
        while self._running:
            try:
                async with websockets.connect(self.url) as ws:
                    if self._on_connected:
                        self._on_connected()
                    async for raw in ws:
                        if not self._running:
                            break
                        try:
                            data = json.loads(raw)
                            if self._on_message:
                                self._on_message(data)
                        except json.JSONDecodeError as e:
                            if self._on_error:
                                self._on_error(e)
            except Exception as e:
                if self._on_error:
                    self._on_error(e)
            finally:
                if self._on_disconnected:
                    self._on_disconnected()

            if not self.reconnect or not self._running:
                break
            await asyncio.sleep(self.reconnect_delay)

    def disconnect(self):
        """Stop the stream."""
        self._running = False

    def run(self):
        """Blocking convenience method — runs connect() in asyncio event loop."""
        asyncio.run(self.connect())
