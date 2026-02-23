"""Typed dataclasses for API responses."""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class RemoteUsageSummary:
    remoteCommands: int = 0
    freeRemaining: int = 0


@dataclass
class UsageInfo:
    autoClicks: int = 0
    remoteCommands: int = 0
    autoFreeRemaining: int = 0
    rcFreeRemaining: int = 0


@dataclass
class ToggleResponse:
    auto_run: Optional[bool] = None
    auto_allow: Optional[bool] = None


@dataclass
class SendCommandResponse:
    status: str = ""
    position: int = 0
    usage: Optional[RemoteUsageSummary] = None


@dataclass
class StartNewChatResponse:
    status: str = ""


@dataclass
class SwitchChatResponse:
    status: str = ""
    title: str = ""
    usage: Optional[RemoteUsageSummary] = None


@dataclass
class GetCommandResponse:
    text: Optional[str] = None
    status: str = ""
    auto_run: bool = False
    auto_allow: bool = False
    start_new_chat: bool = False
    switch_chat: Optional[str] = None
    usage: Optional[UsageInfo] = None


@dataclass
class UpdateResponse:
    status: str = ""


@dataclass
class StatsResponse:
    autoRunClicks: int = 0
    autoAllowClicks: int = 0
    remoteCommands: int = 0
    totalSessions: int = 0
    firstUsed: str = ""
    lastUsed: str = ""


@dataclass
class TrackActionResponse:
    status: str = ""
    stats: Optional[StatsResponse] = None
