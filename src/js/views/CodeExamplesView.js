const CodeExamplesView = {
    setup() {
        const activeLang = ref('python');
        const activeEndpoint = ref('send_command');

        const languages = [
            { id: 'python', name: 'Python', icon: '🐍' },
            { id: 'javascript', name: 'JavaScript', icon: '🟨' },
            { id: 'curl', name: 'cURL', icon: '🔧' },
            { id: 'go', name: 'Go', icon: '🐹' },
            { id: 'rust', name: 'Rust', icon: '🦀' },
            { id: 'csharp', name: 'C#', icon: '🟦' },
            { id: 'php', name: 'PHP', icon: '🐘' },
            { id: 'ruby', name: 'Ruby', icon: '💎' },
        ];

        const endpoints = [
            { id: 'send_command', method: 'POST', path: '/send_command', desc: 'Send a prompt to the active AI chat' },
            { id: 'start_new_chat', method: 'POST', path: '/start-new-chat', desc: 'Start a new chat session' },
            { id: 'switch_chat', method: 'POST', path: '/switch_chat', desc: 'Switch to a chat by title' },
            { id: 'toggle_auto_run', method: 'POST', path: '/toggle_auto_run', desc: 'Toggle Auto-Run automation' },
            { id: 'toggle_auto_allow', method: 'POST', path: '/toggle_auto_allow', desc: 'Toggle Auto-Allow automation' },
            { id: 'get_command', method: 'GET', path: '/get_command', desc: 'Poll for queued commands' },
            { id: 'stats', method: 'GET', path: '/stats', desc: 'Get usage statistics' },
            { id: 'update', method: 'POST', path: '/update', desc: 'Push chat content' },
            { id: 'track_action', method: 'POST', path: '/track_action', desc: 'Track a usage action' },
            { id: 'websocket', method: 'WS', path: 'ws://localhost:9812', desc: 'Live stream chat outputs' },
        ];

        const samples = {
            python: {
                send_command: `import requests\n\nresponse = requests.post("http://localhost:5000/send_command", json={\n    "text": "Refactor the auth module and add tests"\n})\nprint(response.json())\n# {"status": "queued", "position": 1, "usage": {...}}`,
                start_new_chat: `import requests\n\nresponse = requests.post("http://localhost:5000/start-new-chat")\nprint(response.json())\n# {"status": "queued_new_chat"}`,
                switch_chat: `import requests\n\nresponse = requests.post("http://localhost:5000/switch_chat", json={\n    "title": "Refactoring Auth Module"\n})\nprint(response.json())`,
                toggle_auto_run: `import requests\n\nresponse = requests.post("http://localhost:5000/toggle_auto_run")\nprint(response.json())  # {"auto_run": true}`,
                toggle_auto_allow: `import requests\n\nresponse = requests.post("http://localhost:5000/toggle_auto_allow")\nprint(response.json())  # {"auto_allow": true}`,
                get_command: `import requests\n\nresponse = requests.get("http://localhost:5000/get_command")\ndata = response.json()\nprint(f"Command: {data.get('text')}")`,
                stats: `import requests\n\nresponse = requests.get("http://localhost:5000/stats")\nstats = response.json()\nprint(f"Auto-Run clicks: {stats['autoRunClicks']}")`,
                update: `import requests\n\nresponse = requests.post("http://localhost:5000/update", json={\n    "title": "Debug Session",\n    "content": "User: fix the bug\\nAssistant: ..."\n})\nprint(response.json())  # {"status": "received"}`,
                track_action: `import requests\n\nresponse = requests.post("http://localhost:5000/track_action", json={\n    "action": "auto_run"  # or "auto_allow" or "remote_command"\n})\nprint(response.json())  # {"status": "tracked", "stats": {...}}`,
                websocket: `import asyncio, websockets, json\n\nasync def watch_stream():\n    async with websockets.connect("ws://localhost:9812") as ws:\n        while True:\n            data = json.loads(await ws.recv())\n            print(f"[{data['title']}] {data['content'][:100]}...")\n\nasyncio.run(watch_stream())`,
            },
            javascript: {
                send_command: `const res = await fetch("http://localhost:5000/send_command", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ text: "Refactor the auth module" }),\n});\nconsole.log(await res.json());\n// { status: "queued", position: 1 }`,
                start_new_chat: `const res = await fetch("http://localhost:5000/start-new-chat", {\n  method: "POST"\n});\nconsole.log(await res.json());\n// { status: "queued_new_chat" }`,
                switch_chat: `const res = await fetch("http://localhost:5000/switch_chat", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "Refactoring Auth Module" }),\n});\nconsole.log(await res.json());`,
                toggle_auto_run: `const res = await fetch("http://localhost:5000/toggle_auto_run", {\n  method: "POST"\n});\nconsole.log(await res.json()); // { auto_run: true }`,
                toggle_auto_allow: `const res = await fetch("http://localhost:5000/toggle_auto_allow", {\n  method: "POST"\n});\nconsole.log(await res.json()); // { auto_allow: true }`,
                get_command: `const res = await fetch("http://localhost:5000/get_command");\nconst data = await res.json();\nconsole.log("Command:", data.text);`,
                stats: `const res = await fetch("http://localhost:5000/stats");\nconst stats = await res.json();\nconsole.log("Auto-Run:", stats.autoRunClicks);`,
                update: `const res = await fetch("http://localhost:5000/update", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ title: "Debug", content: "..." }),\n});\nconsole.log(await res.json());`,
                track_action: `const res = await fetch("http://localhost:5000/track_action", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ action: "auto_run" }),\n});\nconsole.log(await res.json());`,
                websocket: `const ws = new WebSocket("ws://localhost:9812");\nws.onmessage = (e) => {\n  const data = JSON.parse(e.data);\n  console.log(\`[\${data.title}] \${data.content}\`);\n};`,
            },
            curl: {
                send_command: `curl -X POST http://localhost:5000/send_command \\\n  -H "Content-Type: application/json" \\\n  -d '{"text": "Refactor the auth module"}'`,
                start_new_chat: `curl -X POST http://localhost:5000/start-new-chat`,
                switch_chat: `curl -X POST http://localhost:5000/switch_chat \\\n  -H "Content-Type: application/json" \\\n  -d '{"title": "Refactoring Auth Module"}'`,
                toggle_auto_run: `curl -X POST http://localhost:5000/toggle_auto_run`,
                toggle_auto_allow: `curl -X POST http://localhost:5000/toggle_auto_allow`,
                get_command: `curl http://localhost:5000/get_command`,
                stats: `curl http://localhost:5000/stats`,
                update: `curl -X POST http://localhost:5000/update \\\n  -H "Content-Type: application/json" \\\n  -d '{"title": "Debug", "content": "..."}'`,
                track_action: `curl -X POST http://localhost:5000/track_action \\\n  -H "Content-Type: application/json" \\\n  -d '{"action": "auto_run"}'`,
                websocket: `# Install: npm install -g wscat\nwscat -c ws://localhost:9812\n\n# Or with websocat:\nwebsocat ws://localhost:9812`,
            },
            go: {
                send_command: `payload := []byte(\`{"text": "Refactor the auth module"}\`)\nresp, _ := http.Post("http://localhost:5000/send_command",\n    "application/json", bytes.NewBuffer(payload))\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                start_new_chat: `resp, _ := http.Post("http://localhost:5000/start-new-chat",\n    "application/json", nil)\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                switch_chat: `payload := []byte(\`{"title": "Refactoring Auth Module"}\`)\nresp, _ := http.Post("http://localhost:5000/switch_chat",\n    "application/json", bytes.NewBuffer(payload))\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                toggle_auto_run: `resp, _ := http.Post("http://localhost:5000/toggle_auto_run",\n    "application/json", nil)\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                toggle_auto_allow: `resp, _ := http.Post("http://localhost:5000/toggle_auto_allow",\n    "application/json", nil)\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                get_command: `resp, _ := http.Get("http://localhost:5000/get_command")\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                stats: `resp, _ := http.Get("http://localhost:5000/stats")\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                update: `payload := []byte(\`{"title":"Debug","content":"..."}\`)\nresp, _ := http.Post("http://localhost:5000/update",\n    "application/json", bytes.NewBuffer(payload))\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                track_action: `payload := []byte(\`{"action":"auto_run"}\`)\nresp, _ := http.Post("http://localhost:5000/track_action",\n    "application/json", bytes.NewBuffer(payload))\ndefer resp.Body.Close()\nbody, _ := io.ReadAll(resp.Body)\nfmt.Println(string(body))`,
                websocket: `// go get github.com/gorilla/websocket\nc, _, _ := websocket.DefaultDialer.Dial("ws://localhost:9812", nil)\ndefer c.Close()\nfor {\n    _, msg, _ := c.ReadMessage()\n    fmt.Println(string(msg))\n}`,
            },
            rust: {
                send_command: `let client = reqwest::Client::new();\nlet res: serde_json::Value = client\n    .post("http://localhost:5000/send_command")\n    .json(&serde_json::json!({"text": "Refactor auth"}))\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                start_new_chat: `let res: serde_json::Value = client\n    .post("http://localhost:5000/start-new-chat")\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                switch_chat: `let res: serde_json::Value = client\n    .post("http://localhost:5000/switch_chat")\n    .json(&serde_json::json!({"title": "Refactoring"}))\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                toggle_auto_run: `let res: serde_json::Value = client\n    .post("http://localhost:5000/toggle_auto_run")\n    .send().await?.json().await?;\nprintln!("Auto-Run: {}", res);`,
                toggle_auto_allow: `let res: serde_json::Value = client\n    .post("http://localhost:5000/toggle_auto_allow")\n    .send().await?.json().await?;\nprintln!("Auto-Allow: {}", res);`,
                get_command: `let res: serde_json::Value = client\n    .get("http://localhost:5000/get_command")\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                stats: `let res: serde_json::Value = client\n    .get("http://localhost:5000/stats")\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                update: `let res: serde_json::Value = client\n    .post("http://localhost:5000/update")\n    .json(&serde_json::json!({"title":"Debug","content":"..."}))\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                track_action: `let res: serde_json::Value = client\n    .post("http://localhost:5000/track_action")\n    .json(&serde_json::json!({"action": "auto_run"}))\n    .send().await?.json().await?;\nprintln!("{}", res);`,
                websocket: `// tungstenite = "0.24"\nlet (mut ws, _) = tungstenite::connect("ws://localhost:9812")?;\nloop {\n    let msg = ws.read()?;\n    println!("{}", msg);\n}`,
            },
            csharp: {
                send_command: `var http = new HttpClient();\nvar res = await http.PostAsJsonAsync(\n    "http://localhost:5000/send_command",\n    new { text = "Refactor the auth module" });\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                start_new_chat: `var res = await http.PostAsync(\n    "http://localhost:5000/start-new-chat", null);\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                switch_chat: `var res = await http.PostAsJsonAsync(\n    "http://localhost:5000/switch_chat",\n    new { title = "Refactoring Auth Module" });\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                toggle_auto_run: `var res = await http.PostAsync(\n    "http://localhost:5000/toggle_auto_run", null);\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                toggle_auto_allow: `var res = await http.PostAsync(\n    "http://localhost:5000/toggle_auto_allow", null);\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                get_command: `var data = await http.GetStringAsync(\n    "http://localhost:5000/get_command");\nConsole.WriteLine(data);`,
                stats: `var data = await http.GetStringAsync(\n    "http://localhost:5000/stats");\nConsole.WriteLine(data);`,
                update: `var res = await http.PostAsJsonAsync(\n    "http://localhost:5000/update",\n    new { title = "Debug", content = "..." });\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                track_action: `var res = await http.PostAsJsonAsync(\n    "http://localhost:5000/track_action",\n    new { action = "auto_run" });\nConsole.WriteLine(await res.Content.ReadAsStringAsync());`,
                websocket: `using var ws = new ClientWebSocket();\nawait ws.ConnectAsync(new Uri("ws://localhost:9812"),\n    CancellationToken.None);\nvar buf = new byte[4096];\nwhile (ws.State == WebSocketState.Open) {\n    var r = await ws.ReceiveAsync(buf, CancellationToken.None);\n    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, r.Count));\n}`,
            },
            php: {
                send_command: `$ch = curl_init("http://localhost:5000/send_command");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);\ncurl_setopt($ch, CURLOPT_POSTFIELDS,\n    json_encode(["text" => "Refactor the auth module"]));\n$res = curl_exec($ch);\necho $res;`,
                start_new_chat: `$ch = curl_init("http://localhost:5000/start-new-chat");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\n$res = curl_exec($ch);\necho $res;`,
                switch_chat: `$ch = curl_init("http://localhost:5000/switch_chat");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);\ncurl_setopt($ch, CURLOPT_POSTFIELDS,\n    json_encode(["title" => "Refactoring Auth Module"]));\necho curl_exec($ch);`,
                toggle_auto_run: `$res = file_get_contents("http://localhost:5000/toggle_auto_run",\n    false, stream_context_create(["http" => ["method" => "POST"]]));\necho $res;`,
                toggle_auto_allow: `$res = file_get_contents("http://localhost:5000/toggle_auto_allow",\n    false, stream_context_create(["http" => ["method" => "POST"]]));\necho $res;`,
                get_command: `$res = file_get_contents("http://localhost:5000/get_command");\n$data = json_decode($res, true);\nprint_r($data);`,
                stats: `$res = file_get_contents("http://localhost:5000/stats");\n$data = json_decode($res, true);\nprint_r($data);`,
                update: `$ch = curl_init("http://localhost:5000/update");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);\ncurl_setopt($ch, CURLOPT_POSTFIELDS,\n    json_encode(["title"=>"Debug","content"=>"..."]));\necho curl_exec($ch);`,
                track_action: `$ch = curl_init("http://localhost:5000/track_action");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);\ncurl_setopt($ch, CURLOPT_POSTFIELDS,\n    json_encode(["action"=>"auto_run"]));\necho curl_exec($ch);`,
                websocket: `// composer require textalk/websocket\nuse WebSocket\\Client;\n$client = new Client("ws://localhost:9812");\nwhile (true) {\n    $msg = $client->receive();\n    echo json_decode($msg, true)["title"] . "\\n";\n}`,
            },
            ruby: {
                send_command: `require "net/http"\nrequire "json"\n\nuri = URI("http://localhost:5000/send_command")\nreq = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")\nreq.body = { text: "Refactor the auth module" }.to_json\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs JSON.parse(res.body)`,
                start_new_chat: `uri = URI("http://localhost:5000/start-new-chat")\nreq = Net::HTTP::Post.new(uri)\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs JSON.parse(res.body)`,
                switch_chat: `uri = URI("http://localhost:5000/switch_chat")\nreq = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")\nreq.body = { title: "Refactoring Auth Module" }.to_json\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs JSON.parse(res.body)`,
                toggle_auto_run: `uri = URI("http://localhost:5000/toggle_auto_run")\nreq = Net::HTTP::Post.new(uri)\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs res.body`,
                toggle_auto_allow: `uri = URI("http://localhost:5000/toggle_auto_allow")\nreq = Net::HTTP::Post.new(uri)\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs res.body`,
                get_command: `res = Net::HTTP.get_response(URI("http://localhost:5000/get_command"))\nputs JSON.parse(res.body)`,
                stats: `res = Net::HTTP.get_response(URI("http://localhost:5000/stats"))\nputs JSON.parse(res.body)`,
                update: `uri = URI("http://localhost:5000/update")\nreq = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")\nreq.body = { title: "Debug", content: "..." }.to_json\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs res.body`,
                track_action: `uri = URI("http://localhost:5000/track_action")\nreq = Net::HTTP::Post.new(uri, "Content-Type" => "application/json")\nreq.body = { action: "auto_run" }.to_json\nres = Net::HTTP.start(uri.hostname, uri.port) { |h| h.request(req) }\nputs res.body`,
                websocket: `# gem install faye-websocket eventmachine\nrequire "faye/websocket"\nrequire "eventmachine"\n\nEM.run do\n  ws = Faye::WebSocket::Client.new("ws://localhost:9812")\n  ws.on(:message) { |e| puts JSON.parse(e.data) }\nend`,
            },
        };

        const currentCode = computed(() => {
            return samples[activeLang.value]?.[activeEndpoint.value] || '// Select an endpoint';
        });

        return { activeLang, activeEndpoint, languages, endpoints, currentCode };
    },
    template: `
    <div class="view-enter">
        <!-- Hero -->
        <section class="pt-28 pb-12 grid-pattern">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">Developer Resources</span>
                <h1 class="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Code Examples</h1>
                <p class="text-slate-400 max-w-xl mx-auto">Copy-paste ready examples for every API endpoint in <strong class="text-white">8 languages</strong>. Pick your language and endpoint below.</p>
            </div>
        </section>

        <!-- Language + Endpoint Selector -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <!-- Language tabs -->
            <div class="mb-6">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Language</div>
                <div class="flex flex-wrap gap-2">
                    <button v-for="l in languages" :key="l.id" @click="activeLang = l.id"
                        :class="['lang-tab', activeLang === l.id ? 'active' : '']">
                        {{l.icon}} {{l.name}}
                    </button>
                </div>
            </div>

            <!-- Endpoint tabs -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Endpoint</div>
                <div class="flex flex-wrap gap-2">
                    <button v-for="e in endpoints" :key="e.id" @click="activeEndpoint = e.id"
                        :class="['lang-tab text-xs', activeEndpoint === e.id ? 'active' : '']">
                        <span :class="e.method === 'GET' ? 'text-blue-400' : e.method === 'WS' ? 'text-purple-400' : 'text-green-400'" class="font-bold mr-1">{{e.method}}</span>
                        {{e.path}}
                    </button>
                </div>
            </div>

            <!-- Code block -->
            <div class="code-block glow-blue">
                <div class="code-header">
                    <div class="code-dot" style="background:#ff5f57"></div>
                    <div class="code-dot" style="background:#febc2e"></div>
                    <div class="code-dot" style="background:#28c840"></div>
                    <span class="text-xs text-slate-600 font-mono ml-2">{{activeLang}} — {{activeEndpoint}}</span>
                </div>
                <div class="code-body">{{currentCode}}</div>
            </div>

            <!-- Desc for selected endpoint -->
            <div class="mt-4 glass rounded-xl p-4">
                <p class="text-sm text-slate-400" v-for="e in endpoints" :key="e.id" v-show="activeEndpoint === e.id">
                    <span :class="e.method === 'GET' ? 'text-blue-400' : e.method === 'WS' ? 'text-purple-400' : 'text-green-400'" class="font-bold font-mono text-xs mr-2">{{e.method}}</span>
                    <code class="text-white font-mono text-sm mr-3">{{e.path}}</code>
                    {{e.desc}}
                </p>
            </div>
        </section>

        <!-- Full files link -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
            <div class="glass-strong rounded-2xl p-8 text-center glow-purple">
                <h2 class="text-xl font-bold text-white mb-3">Want the complete files?</h2>
                <p class="text-sm text-slate-400 mb-6">Each language has a full standalone file covering every endpoint. Download from GitHub:</p>
                <a href="https://github.com/joecodecreations/antigravity_automation/tree/main/code_samples" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg transition-all hover:scale-105 font-bold text-sm inline-flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View code_samples on GitHub
                </a>
            </div>
        </section>
    </div>
    `
};
