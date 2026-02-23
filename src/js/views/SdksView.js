const SdksView = {
    setup() {
        const active = ref(null);        // null = landing, 'nodejs' | 'python'
        const section = ref('overview'); // current doc section
        const copied = ref('');

        function copy(text, id) {
            navigator.clipboard.writeText(text).then(() => {
                copied.value = id;
                setTimeout(() => { copied.value = ''; }, 2000);
            });
        }

        function selectSdk(id) {
            active.value = id;
            section.value = 'overview';
        }

        // ── Syntax highlighting ──────────────────
        function esc(s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        function highlight(code, lang) {
            let h = esc(code);
            if (lang === 'python') {
                h = h.replace(/(#.*)/g, '<span style="color:#8b949e;font-style:italic">$1</span>');
            } else {
                h = h.replace(/(\/\/.*)/g, '<span style="color:#8b949e;font-style:italic">$1</span>');
            }
            h = h.replace(/("[^"]*")/g, '<span style="color:#a5d6ff">$1</span>');
            h = h.replace(/('[^']*')/g, '<span style="color:#a5d6ff">$1</span>');
            h = h.replace(/(`[^`]*`)/g, '<span style="color:#a5d6ff">$1</span>');
            if (lang === 'python') {
                h = h.replace(/\b(from|import|as|def|class|return|if|else|elif|for|while|with|async|await|True|False|None|lambda|print|self)\b/g, '<span style="color:#ff7b72">$1</span>');
            } else {
                h = h.replace(/\b(const|let|var|new|await|async|function|return|if|else|for|while|true|false|null|require|import|from|export)\b/g, '<span style="color:#ff7b72">$1</span>');
            }
            h = h.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#79c0ff">$1</span>');
            h = h.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color:#d2a8ff">$1</span>(');
            return h;
        }

        function hi(code) {
            return highlight(code, active.value === 'nodejs' ? 'js' : 'python');
        }

        // ── Navigation sidebar items ─────────────
        const navSections = [
            {
                group: 'Getting Started', items: [
                    { id: 'overview', label: 'Overview' },
                    { id: 'installation', label: 'Installation' },
                    { id: 'quickstart', label: 'Quick Start' },
                ]
            },
            {
                group: 'Core Concepts', items: [
                    { id: 'rest-client', label: 'REST API Client' },
                    { id: 'websocket', label: 'WebSocket Stream' },
                    { id: 'configuration', label: 'Configuration' },
                ]
            },
            {
                group: 'API Reference', items: [
                    { id: 'methods', label: 'Methods' },
                    { id: 'types', label: 'Types & Responses' },
                ]
            },
        ];

        // ── SDK Data ─────────────────────────────
        const sdks = {
            nodejs: {
                name: 'Node.js',
                icon: '🟩',
                pkg: 'antigravity-automation',
                install: 'npm install antigravity-automation',
                installDev: 'npm install antigravity-automation --save-dev',
                runtime: 'Node.js ≥ 16',
                registry: 'npm',
                registryUrl: 'https://www.npmjs.com/package/antigravity-automation',
                sourceUrl: 'https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/npm',
                importLine: "const { AntigravityClient, AntigravityStream } = require('antigravity-automation');",
                features: [
                    'Full TypeScript types & declarations (.d.ts)',
                    'All 9 REST API endpoints covered',
                    'WebSocket stream with auto-reconnect',
                    'Configurable base URL, timeout, and reconnect settings',
                    'CommonJS and ES module support',
                    'Zero external dependencies (uses native fetch)',
                ],
                quickstart: `const { AntigravityClient } = require('antigravity-automation');

const client = new AntigravityClient();

// Send a command to the AI chat
await client.sendCommand('Refactor the auth module');

// Toggle auto-click automation
await client.toggleAutoRun();

// Get usage statistics
const stats = await client.getStats();
console.log(stats);`,
                clientExample: `const { AntigravityClient } = require('antigravity-automation');

// Create a client with default settings
const client = new AntigravityClient();

// Or customize the connection
const client = new AntigravityClient({
    baseUrl: 'http://localhost:5000',
    timeout: 10000,  // ms
});

// Send a command
const result = await client.sendCommand('Write unit tests');
console.log(result.status);   // 'queued'
console.log(result.position);  // 1

// Toggle automation
const state = await client.toggleAutoRun();
console.log(state.auto_run);  // true or false

// Start a new chat
await client.startNewChat();

// Switch to a specific chat
await client.switchChat('My Project Chat');

// Get current state
const cmd = await client.getCommand();
console.log(cmd.auto_run, cmd.auto_allow);

// Get stats
const stats = await client.getStats();
console.log(stats.autoRunClicks);`,
                streamExample: `const { AntigravityStream } = require('antigravity-automation');

const stream = new AntigravityStream({
    url: 'ws://localhost:9812',
    reconnect: true,            // auto-reconnect on disconnect
    reconnectDelay: 3000,       // wait 3s before reconnecting
});

// Event handlers
stream.onConnected(() => {
    console.log('Connected to Antigravity stream');
});

stream.onMessage((msg) => {
    console.log(\`[\${msg.title}] \${msg.content}\`);
});

stream.onDisconnected(() => {
    console.log('Disconnected — will auto-reconnect');
});

stream.onError((err) => {
    console.error('Stream error:', err.message);
});

// Start listening
stream.connect();

// Later, to stop:
// stream.disconnect();`,
                configExample: `const client = new AntigravityClient({
    baseUrl: 'http://localhost:5000',  // REST API base URL
    timeout: 10000,                     // Request timeout in ms
});

const stream = new AntigravityStream({
    url: 'ws://localhost:9812',  // WebSocket URL
    reconnect: true,              // Auto-reconnect on disconnect
    reconnectDelay: 3000,         // Reconnect delay in ms
});`,
                methods: [
                    { endpoint: 'POST /send_command', method: 'sendCommand(text)', desc: 'Send a prompt to the active AI chat' },
                    { endpoint: 'POST /start-new-chat', method: 'startNewChat()', desc: 'Start a fresh chat session' },
                    { endpoint: 'POST /switch_chat', method: 'switchChat(title)', desc: 'Switch to a conversation by title' },
                    { endpoint: 'POST /toggle_auto_run', method: 'toggleAutoRun()', desc: 'Toggle the auto-click Run button' },
                    { endpoint: 'POST /toggle_auto_allow', method: 'toggleAutoAllow()', desc: 'Toggle auto-approve permissions' },
                    { endpoint: 'GET /get_command', method: 'getCommand()', desc: 'Poll for queued commands and state' },
                    { endpoint: 'GET /stats', method: 'getStats()', desc: 'Get cumulative usage statistics' },
                    { endpoint: 'POST /update', method: 'update(title, content)', desc: 'Push chat content (webhook)' },
                    { endpoint: 'POST /track_action', method: 'trackAction(action)', desc: 'Track a usage action' },
                ],
                types: [
                    { name: 'ToggleResponse', fields: 'auto_run?: boolean, auto_allow?: boolean' },
                    { name: 'SendCommandResponse', fields: 'status: string, position: number, usage?: RemoteUsageSummary' },
                    { name: 'StartNewChatResponse', fields: 'status: string' },
                    { name: 'SwitchChatResponse', fields: 'status: string, title: string, usage?: RemoteUsageSummary' },
                    { name: 'GetCommandResponse', fields: 'text: string | null, status: string, auto_run: boolean, auto_allow: boolean, ...' },
                    { name: 'StatsResponse', fields: 'autoRunClicks: number, autoAllowClicks: number, remoteCommands: number, ...' },
                    { name: 'TrackActionResponse', fields: 'status: string, stats: StatsResponse' },
                    { name: 'StreamMessage', fields: 'title: string, content: string' },
                ],
                typesImport: `// TypeScript — types are auto-imported
import { AntigravityClient, AntigravityStream } from 'antigravity-automation';
import type { SendCommandResponse, StatsResponse, StreamMessage } from 'antigravity-automation';

// All methods return typed responses
const result: SendCommandResponse = await client.sendCommand('test');
const stats: StatsResponse = await client.getStats();`,
            },
            python: {
                name: 'Python',
                icon: '🐍',
                pkg: 'antigravity-automation',
                install: 'pip install antigravity-automation',
                installDev: 'pip install antigravity-automation[dev]',
                runtime: 'Python ≥ 3.8',
                registry: 'PyPI',
                registryUrl: 'https://pypi.org/project/antigravity-automation/',
                sourceUrl: 'https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/python',
                importLine: 'from antigravity_automation import AntigravityClient, AntigravityStream',
                features: [
                    'Typed dataclasses for every API response',
                    'All 9 REST API endpoints covered',
                    'Async WebSocket stream with auto-reconnect',
                    'Configurable base URL, timeout, and reconnect settings',
                    'Sync REST client (requests) + async stream (websockets)',
                    'Zero config — works out of the box',
                ],
                quickstart: `from antigravity_automation import AntigravityClient

client = AntigravityClient()

# Send a command to the AI chat
result = client.send_command("Refactor the auth module")
print(result)  # SendCommandResponse(status='queued', ...)

# Toggle auto-click automation
client.toggle_auto_run()

# Get usage statistics
stats = client.get_stats()
print(f"Auto-Run clicks: {stats.autoRunClicks}")`,
                clientExample: `from antigravity_automation import AntigravityClient

# Create a client with default settings
client = AntigravityClient()

# Or customize the connection
client = AntigravityClient(
    base_url="http://localhost:5000",
    timeout=10,  # seconds
)

# Send a command
result = client.send_command("Write unit tests")
print(result.status)    # 'queued'
print(result.position)  # 1

# Toggle automation
state = client.toggle_auto_run()
print(state.auto_run)  # True or False

# Start a new chat
client.start_new_chat()

# Switch to a specific chat
client.switch_chat("My Project Chat")

# Get current state
cmd = client.get_command()
print(cmd.auto_run, cmd.auto_allow)

# Get stats
stats = client.get_stats()
print(stats.autoRunClicks)`,
                streamExample: `from antigravity_automation import AntigravityStream

stream = AntigravityStream(
    url="ws://localhost:9812",
    reconnect=True,             # auto-reconnect on disconnect
    reconnect_delay=3.0,        # wait 3s before reconnecting
)

# Set event handlers
stream.on_message(lambda msg: print(f"[{msg['title']}] {msg['content']}"))
stream.on_connected(lambda: print("Connected to Antigravity stream"))
stream.on_disconnected(lambda: print("Disconnected — will auto-reconnect"))
stream.on_error(lambda e: print(f"Stream error: {e}"))

# Start listening (blocking)
stream.run()

# Or use async:
# await stream.connect()`,
                configExample: `client = AntigravityClient(
    base_url="http://localhost:5000",  # REST API base URL
    timeout=10,                         # Request timeout in seconds
)

stream = AntigravityStream(
    url="ws://localhost:9812",   # WebSocket URL
    reconnect=True,              # Auto-reconnect on disconnect
    reconnect_delay=3.0,         # Reconnect delay in seconds
)`,
                methods: [
                    { endpoint: 'POST /send_command', method: 'send_command(text)', desc: 'Send a prompt to the active AI chat' },
                    { endpoint: 'POST /start-new-chat', method: 'start_new_chat()', desc: 'Start a fresh chat session' },
                    { endpoint: 'POST /switch_chat', method: 'switch_chat(title)', desc: 'Switch to a conversation by title' },
                    { endpoint: 'POST /toggle_auto_run', method: 'toggle_auto_run()', desc: 'Toggle the auto-click Run button' },
                    { endpoint: 'POST /toggle_auto_allow', method: 'toggle_auto_allow()', desc: 'Toggle auto-approve permissions' },
                    { endpoint: 'GET /get_command', method: 'get_command()', desc: 'Poll for queued commands and state' },
                    { endpoint: 'GET /stats', method: 'get_stats()', desc: 'Get cumulative usage statistics' },
                    { endpoint: 'POST /update', method: 'update(title, content)', desc: 'Push chat content (webhook)' },
                    { endpoint: 'POST /track_action', method: 'track_action(action)', desc: 'Track a usage action' },
                ],
                types: [
                    { name: 'ToggleResponse', fields: 'auto_run: Optional[bool], auto_allow: Optional[bool]' },
                    { name: 'SendCommandResponse', fields: 'status: str, position: int, usage: Optional[RemoteUsageSummary]' },
                    { name: 'StartNewChatResponse', fields: 'status: str' },
                    { name: 'SwitchChatResponse', fields: 'status: str, title: str, usage: Optional[RemoteUsageSummary]' },
                    { name: 'GetCommandResponse', fields: 'text: Optional[str], status: str, auto_run: bool, auto_allow: bool, ...' },
                    { name: 'StatsResponse', fields: 'autoRunClicks: int, autoAllowClicks: int, remoteCommands: int, ...' },
                    { name: 'TrackActionResponse', fields: 'status: str, stats: Optional[StatsResponse]' },
                ],
                typesImport: `from antigravity_automation import AntigravityClient
from antigravity_automation.types import (
    SendCommandResponse,
    StatsResponse,
    ToggleResponse,
    GetCommandResponse,
)

# All methods return typed dataclasses
result: SendCommandResponse = client.send_command("test")
stats: StatsResponse = client.get_stats()
print(result.status, result.position)`,
            }
        };

        const sdk = computed(() => sdks[active.value]);

        return { active, section, copied, copy, selectSdk, hi, navSections, sdk };
    },
    template: `
    <div class="view-enter">

        <!-- ═══════ LANDING: Select a library ═══════ -->
        <template v-if="!active">
            <section class="pt-28 pb-20 grid-pattern min-h-screen">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">Official Libraries</span>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Choose Your SDK</h1>
                    <p class="text-slate-400 max-w-xl mx-auto mb-12">Select a language to view installation steps, guides, and full API reference for the <a href="https://antigravityautomation.com" class="text-blue-400 hover:underline">Antigravity Automation</a> extension.</p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <!-- Node.js Card -->
                        <button @click="selectSdk('nodejs')" class="glass-strong rounded-2xl p-8 hover-lift group text-left transition-all hover:border-green-500/30" style="border:1px solid transparent">
                            <div class="w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">🟩</div>
                            <h2 class="text-xl font-bold text-white mb-2">Node.js</h2>
                            <p class="text-sm text-slate-500 font-mono mb-3">antigravity-automation</p>
                            <p class="text-sm text-slate-400 leading-relaxed">Full TypeScript support, REST client, and WebSocket stream with auto-reconnect.</p>
                            <div class="mt-4 text-green-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Get Started →</div>
                        </button>

                        <!-- Python Card -->
                        <button @click="selectSdk('python')" class="glass-strong rounded-2xl p-8 hover-lift group text-left transition-all hover:border-blue-500/30" style="border:1px solid transparent">
                            <div class="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">🐍</div>
                            <h2 class="text-xl font-bold text-white mb-2">Python</h2>
                            <p class="text-sm text-slate-500 font-mono mb-3">antigravity-automation</p>
                            <p class="text-sm text-slate-400 leading-relaxed">Typed dataclasses, sync REST client, and async WebSocket stream.</p>
                            <div class="mt-4 text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">Get Started →</div>
                        </button>
                    </div>
                </div>
            </section>
        </template>

        <!-- ═══════ DOCUMENTATION VIEW ═══════ -->
        <template v-else>
            <div class="pt-20 flex min-h-screen">

                <!-- Sidebar -->
                <aside class="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/80 sticky top-0 h-screen overflow-y-auto" style="padding-top:80px">
                    <div class="px-4 pb-4">
                        <!-- Language Switcher Dropdown -->
                        <div class="mb-6">
                            <label class="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-1.5">Library</label>
                            <select @change="selectSdk($event.target.value)" :value="active" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-medium focus:outline-none focus:border-blue-500 cursor-pointer appearance-none" style="background-image:url('data:image/svg+xml;utf8,<svg fill=\\'%2394a3b8\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path fill-rule=\\'evenodd\\' d=\\'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\\' clip-rule=\\'evenodd\\'/></svg>');background-repeat:no-repeat;background-position:right 10px center;background-size:16px;padding-right:32px">
                                <option value="nodejs">🟩 Node.js</option>
                                <option value="python">🐍 Python</option>
                            </select>
                        </div>

                        <!-- Nav Groups -->
                        <nav>
                            <div v-for="group in navSections" :key="group.group" class="mb-5">
                                <div class="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2 px-2">{{group.group}}</div>
                                <button v-for="item in group.items" :key="item.id"
                                    @click="section = item.id"
                                    :class="['w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all mb-0.5', section === item.id ? 'bg-blue-500/10 text-blue-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50']">
                                    {{item.label}}
                                </button>
                            </div>
                            <div class="mb-5">
                                <div class="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2 px-2">Resources</div>
                                <a :href="sdk.registryUrl" class="w-full text-left px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all mb-0.5 block">{{sdk.registry}} Package ↗</a>
                                <a :href="sdk.sourceUrl" class="w-full text-left px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all mb-0.5 block">Source Code ↗</a>
                                <a href="#/code-examples" class="w-full text-left px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all mb-0.5 block">Code Examples</a>
                                <a href="https://antigravityautomation.com/api/" class="w-full text-left px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all mb-0.5 block">API Docs (Swagger) ↗</a>
                            </div>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 max-w-3xl px-8 py-10">

                    <!-- ─── Overview ─── -->
                    <div v-if="section === 'overview'">
                        <h1 class="text-2xl font-bold text-white mb-2">{{sdk.name}} SDK</h1>
                        <p class="text-sm text-slate-500 font-mono mb-6">{{sdk.pkg}} · {{sdk.runtime}}</p>
                        <p class="text-slate-400 leading-relaxed mb-8">The official {{sdk.name}} client library for the <a href="https://antigravityautomation.com" class="text-blue-400 hover:underline">Antigravity Automation</a> VS Code extension. Automate clicks, send commands, and stream live AI chat outputs — all via the local REST API and WebSocket.</p>

                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Features</div>
                        <div class="glass rounded-xl p-5 mb-8">
                            <ul class="space-y-2 text-sm text-slate-400">
                                <li v-for="f in sdk.features" :key="f" class="flex items-start gap-2">
                                    <span :class="active === 'nodejs' ? 'text-green-400' : 'text-blue-400'" class="mt-0.5">✓</span> {{f}}
                                </li>
                            </ul>
                        </div>

                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Quick Install</div>
                        <div class="code-block relative group mb-6">
                            <div class="code-body" style="padding:14px 18px;font-size:14px">{{sdk.install}}</div>
                            <button @click="copy(sdk.install, 'install')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'install' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'install' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <div class="flex gap-3">
                            <button @click="section = 'installation'" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-500 hover:to-purple-500 transition-all">Installation Guide →</button>
                            <button @click="section = 'quickstart'" class="px-4 py-2 glass text-slate-400 rounded-lg text-sm font-medium hover:text-white transition-colors">Quick Start →</button>
                        </div>
                    </div>

                    <!-- ─── Installation ─── -->
                    <div v-if="section === 'installation'">
                        <h1 class="text-2xl font-bold text-white mb-6">Installation</h1>

                        <h3 class="text-sm font-bold text-white mb-3">Prerequisites</h3>
                        <ul class="text-sm text-slate-400 space-y-1 mb-6 list-disc list-inside">
                            <li>{{sdk.runtime}}</li>
                            <li>Antigravity Automation extension installed in VS Code</li>
                            <li>Bridge running (Ctrl+Shift+P → "Start Antigravity Bridge")</li>
                        </ul>

                        <h3 class="text-sm font-bold text-white mb-3">Install the Package</h3>
                        <div class="code-block relative group mb-6">
                            <div class="code-body" style="padding:14px 18px;font-size:14px">{{sdk.install}}</div>
                            <button @click="copy(sdk.install, 'prod-install')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'prod-install' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'prod-install' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <h3 class="text-sm font-bold text-white mb-3">Install with Dev Dependencies</h3>
                        <div class="code-block relative group mb-6">
                            <div class="code-body" style="padding:14px 18px;font-size:14px">{{sdk.installDev}}</div>
                            <button @click="copy(sdk.installDev, 'dev-install')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'dev-install' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'dev-install' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <h3 class="text-sm font-bold text-white mb-3">Verify Installation</h3>
                        <div class="code-block relative group mb-8">
                            <div class="code-body" style="padding:14px 18px;font-size:14px" v-html="hi(sdk.importLine)"></div>
                            <button @click="copy(sdk.importLine, 'verify')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'verify' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'verify' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <button @click="section = 'quickstart'" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-500 hover:to-purple-500 transition-all">Next: Quick Start →</button>
                    </div>

                    <!-- ─── Quick Start ─── -->
                    <div v-if="section === 'quickstart'">
                        <h1 class="text-2xl font-bold text-white mb-6">Quick Start</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">Create a file and paste the following to get up and running in seconds. Make sure the Antigravity Bridge is running in VS Code.</p>

                        <div class="code-block relative group mb-8">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">{{active === 'nodejs' ? 'app.js' : 'app.py'}}</span>
                            </div>
                            <div class="code-body" v-html="hi(sdk.quickstart)"></div>
                            <button @click="copy(sdk.quickstart, 'qs')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'qs' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'qs' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <div class="flex gap-3">
                            <button @click="section = 'rest-client'" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-bold hover:from-blue-500 hover:to-purple-500 transition-all">Next: REST Client →</button>
                            <button @click="section = 'websocket'" class="px-4 py-2 glass text-slate-400 rounded-lg text-sm font-medium hover:text-white transition-colors">WebSocket Stream →</button>
                        </div>
                    </div>

                    <!-- ─── REST API Client ─── -->
                    <div v-if="section === 'rest-client'">
                        <h1 class="text-2xl font-bold text-white mb-2">REST API Client</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">The main client class provides typed methods for all 9 REST endpoints. All methods return typed response objects.</p>

                        <div class="code-block relative group mb-8">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">REST Client Usage</span>
                            </div>
                            <div class="code-body" v-html="hi(sdk.clientExample)"></div>
                            <button @click="copy(sdk.clientExample, 'client')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'client' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'client' ? '✓ Copied' : 'Copy'}}</button>
                        </div>
                    </div>

                    <!-- ─── WebSocket Stream ─── -->
                    <div v-if="section === 'websocket'">
                        <h1 class="text-2xl font-bold text-white mb-2">WebSocket Stream</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">Stream live AI chat outputs in real-time. The stream client supports auto-reconnect and event-based handlers.</p>

                        <div class="code-block relative group mb-8">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">{{active === 'nodejs' ? 'stream.js' : 'stream.py'}}</span>
                            </div>
                            <div class="code-body" v-html="hi(sdk.streamExample)"></div>
                            <button @click="copy(sdk.streamExample, 'ws')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'ws' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'ws' ? '✓ Copied' : 'Copy'}}</button>
                        </div>
                    </div>

                    <!-- ─── Configuration ─── -->
                    <div v-if="section === 'configuration'">
                        <h1 class="text-2xl font-bold text-white mb-2">Configuration</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">Both the REST client and WebSocket stream accept optional configuration. The defaults work out of the box if the bridge is running on standard ports.</p>

                        <div class="code-block relative group mb-8">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">config</span>
                            </div>
                            <div class="code-body" v-html="hi(sdk.configExample)"></div>
                            <button @click="copy(sdk.configExample, 'cfg')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'cfg' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'cfg' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <h3 class="text-sm font-bold text-white mb-3">Options</h3>
                        <div class="glass rounded-xl overflow-hidden">
                            <table class="w-full text-sm">
                                <thead><tr class="text-left border-b border-slate-700"><th class="py-2.5 px-4 text-slate-500 font-mono text-xs">Option</th><th class="py-2.5 px-4 text-slate-500 font-mono text-xs">Default</th><th class="py-2.5 px-4 text-slate-500 font-mono text-xs">Description</th></tr></thead>
                                <tbody class="text-xs text-slate-400">
                                    <tr class="border-b border-slate-800/50"><td class="py-2 px-4 font-mono text-white">baseUrl / base_url</td><td class="py-2 px-4 font-mono">http://localhost:5000</td><td class="py-2 px-4">REST API base URL</td></tr>
                                    <tr class="border-b border-slate-800/50"><td class="py-2 px-4 font-mono text-white">timeout</td><td class="py-2 px-4 font-mono">10000ms / 10s</td><td class="py-2 px-4">Request timeout</td></tr>
                                    <tr class="border-b border-slate-800/50"><td class="py-2 px-4 font-mono text-white">url</td><td class="py-2 px-4 font-mono">ws://localhost:9812</td><td class="py-2 px-4">WebSocket URL</td></tr>
                                    <tr class="border-b border-slate-800/50"><td class="py-2 px-4 font-mono text-white">reconnect</td><td class="py-2 px-4 font-mono">true / True</td><td class="py-2 px-4">Auto-reconnect on disconnect</td></tr>
                                    <tr><td class="py-2 px-4 font-mono text-white">reconnectDelay</td><td class="py-2 px-4 font-mono">3000ms / 3.0s</td><td class="py-2 px-4">Delay before reconnecting</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ─── Methods ─── -->
                    <div v-if="section === 'methods'">
                        <h1 class="text-2xl font-bold text-white mb-2">API Methods</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">All methods available on the client class. Each returns a typed response object.</p>

                        <div class="space-y-3">
                            <div v-for="m in sdk.methods" :key="m.endpoint" class="glass rounded-xl p-4">
                                <div class="flex items-center gap-2 mb-1">
                                    <span :class="m.endpoint.startsWith('GET') ? 'text-blue-400 bg-blue-500/10' : 'text-green-400 bg-green-500/10'" class="text-[10px] font-bold font-mono px-2 py-0.5 rounded">{{m.endpoint.split(' ')[0]}}</span>
                                    <code class="text-xs text-slate-400 font-mono">{{m.endpoint.split(' ').slice(1).join(' ')}}</code>
                                </div>
                                <code class="text-sm text-white font-mono font-bold">{{m.method}}</code>
                                <p class="text-xs text-slate-500 mt-1">{{m.desc}}</p>
                            </div>
                        </div>
                    </div>

                    <!-- ─── Types & Responses ─── -->
                    <div v-if="section === 'types'">
                        <h1 class="text-2xl font-bold text-white mb-2">Types & Responses</h1>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">All API methods return typed response objects. Import them directly for full type safety.</p>

                        <div class="code-block relative group mb-8">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">Importing Types</span>
                            </div>
                            <div class="code-body" v-html="hi(sdk.typesImport)"></div>
                            <button @click="copy(sdk.typesImport, 'types-import')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'types-import' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">{{copied === 'types-import' ? '✓ Copied' : 'Copy'}}</button>
                        </div>

                        <h3 class="text-sm font-bold text-white mb-3">Response Types</h3>
                        <div class="space-y-3">
                            <div v-for="t in sdk.types" :key="t.name" class="glass rounded-xl p-4">
                                <code class="text-sm text-white font-mono font-bold">{{t.name}}</code>
                                <div class="text-xs text-slate-500 font-mono mt-1 leading-relaxed">{{t.fields}}</div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </template>
    </div>
    `
};
