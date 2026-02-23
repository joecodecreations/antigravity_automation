"""Live integration test — requires bridge running on localhost:5000."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from antigravity_automation import AntigravityClient

client = AntigravityClient()
print("Testing against http://localhost:5000...\n")

try:
    stats = client.get_stats()
    print(f"✓ GET /stats: {stats}")
except Exception as e:
    print(f"✗ GET /stats: {e}")

try:
    cmd = client.get_command()
    print(f"✓ GET /get_command: {cmd}")
except Exception as e:
    print(f"✗ GET /get_command: {e}")

try:
    run = client.toggle_auto_run()
    print(f"✓ POST /toggle_auto_run: {run}")
    client.toggle_auto_run()  # toggle back
except Exception as e:
    print(f"✗ POST /toggle_auto_run: {e}")

try:
    res = client.send_command("Hello from antigravity-automation Python package test!")
    print(f"✓ POST /send_command: {res}")
except Exception as e:
    print(f"✗ POST /send_command: {e}")

try:
    res = client.track_action("remote_command")
    print(f"✓ POST /track_action: {res}")
except Exception as e:
    print(f"✗ POST /track_action: {e}")

print("\n✅ Live tests complete!")
