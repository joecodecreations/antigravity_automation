"""Offline import tests for the antigravity-automation package."""
import sys
import os

# Add src to path for local testing without install
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from antigravity_automation import AntigravityClient, AntigravityStream
from antigravity_automation.types import (
    ToggleResponse, SendCommandResponse, StartNewChatResponse,
    SwitchChatResponse, GetCommandResponse, UpdateResponse,
    StatsResponse, TrackActionResponse,
)

print("✓ All imports successful")

client = AntigravityClient()
print(f"✓ Client instantiated (default: {client.base_url})")

client2 = AntigravityClient(base_url="http://localhost:3000", timeout=5)
print(f"✓ Client instantiated (custom: {client2.base_url})")

stream = AntigravityStream(reconnect=False)
print(f"✓ Stream instantiated ({stream.url})")

# Test dataclass creation
r = ToggleResponse(auto_run=True)
print(f"✓ ToggleResponse: {r}")

r = StatsResponse(autoRunClicks=10, remoteCommands=5)
print(f"✓ StatsResponse: {r}")

print("\n✅ All offline tests passed!")
print('Run: python tests/test_live.py (with bridge running)')
