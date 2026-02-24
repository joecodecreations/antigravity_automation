"""
Antigravity Automation — Python Client Library

Typed client for the Antigravity Automation REST API and WebSocket stream.
"""

from .client import AntigravityClient
from .stream import AntigravityStream
from .types import (
    ToggleResponse,
    SendCommandResponse,
    StartNewChatResponse,
    SwitchChatResponse,
    GetCommandResponse,
    UpdateResponse,
    StatsResponse,
    TrackActionResponse,
)

__version__ = "1.4.0"
__all__ = [
    "AntigravityClient",
    "AntigravityStream",
    "ToggleResponse",
    "SendCommandResponse",
    "StartNewChatResponse",
    "SwitchChatResponse",
    "GetCommandResponse",
    "UpdateResponse",
    "StatsResponse",
    "TrackActionResponse",
]
