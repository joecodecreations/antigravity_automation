# Antigravity Automation API — Ruby Code Samples
# Requires: gem install json (stdlib), optionally: gem install faye-websocket eventmachine

require "net/http"
require "json"
require "uri"

BASE_URL = "http://localhost:5000"

def post(endpoint, body = nil)
  uri = URI("#{BASE_URL}#{endpoint}")
  req = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")
  req.body = body.to_json if body
  res = Net::HTTP.start(uri.hostname, uri.port) { |http| http.request(req) }
  data = JSON.parse(res.body)
  puts "#{endpoint} → #{data}"
  data
end

def get(endpoint)
  uri = URI("#{BASE_URL}#{endpoint}")
  res = Net::HTTP.get_response(uri)
  data = JSON.parse(res.body)
  puts "#{endpoint} → #{data}"
  data
end

# ── Automation ──────────────────────────────────────
post("/toggle_auto_run")
post("/toggle_auto_allow")

# ── Remote Control ──────────────────────────────────
post("/send_command",  { text: "Refactor the auth module" })
post("/start-new-chat")
post("/switch_chat",   { title: "Refactoring Auth Module" })

# ── Content ─────────────────────────────────────────
get("/get_command")
post("/update", { title: "Debug Session", content: "User: fix the bug\nAssistant: ..." })

# ── Stats ───────────────────────────────────────────
get("/stats")
post("/track_action", { action: "auto_run" })

# ── WebSocket Stream ────────────────────────────────
# require "faye/websocket"
# require "eventmachine"
#
# EM.run do
#   ws = Faye::WebSocket::Client.new("ws://localhost:9812")
#   ws.on(:message) { |e| puts JSON.parse(e.data) }
#   ws.on(:close)   { EM.stop }
# end
