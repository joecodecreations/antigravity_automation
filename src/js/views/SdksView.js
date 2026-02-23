const SdksView = {
    setup() {
        const active = ref('nodejs');
        const copied = ref('');

        function copy(text, id) {
            navigator.clipboard.writeText(text).then(() => {
                copied.value = id;
                setTimeout(() => { copied.value = ''; }, 2000);
            });
        }

        function esc(s) {
            return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        function highlight(code, lang) {
            let h = esc(code);
            // Comments
            if (lang === 'python') {
                h = h.replace(/(#.*)/g, '<span style="color:#8b949e;font-style:italic">$1</span>');
            } else {
                h = h.replace(/(\/\/.*)/g, '<span style="color:#8b949e;font-style:italic">$1</span>');
            }
            // Strings (double then single)
            h = h.replace(/("[^"]*")/g, '<span style="color:#a5d6ff">$1</span>');
            h = h.replace(/('[^']*')/g, '<span style="color:#a5d6ff">$1</span>');
            // Template strings
            h = h.replace(/(`[^`]*`)/g, '<span style="color:#a5d6ff">$1</span>');
            // Keywords
            if (lang === 'python') {
                h = h.replace(/\b(from|import|as|def|class|return|if|else|elif|for|while|with|async|await|True|False|None|lambda|print|self)\b/g, '<span style="color:#ff7b72">$1</span>');
            } else {
                h = h.replace(/\b(const|let|var|new|await|async|function|return|if|else|for|while|true|false|null|require|import|from|export)\b/g, '<span style="color:#ff7b72">$1</span>');
            }
            // Numbers
            h = h.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#79c0ff">$1</span>');
            // Function calls
            h = h.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color:#d2a8ff">$1</span>(');
            // f-strings highlight
            h = h.replace(/\bf(&lt;span|&quot;)/g, '<span style="color:#a5d6ff">f</span>$1');
            return h;
        }

        function hi(code) {
            return highlight(code, active.value === 'nodejs' ? 'js' : 'python');
        }

        const sdks = {
            nodejs: {
                name: 'Node.js',
                icon: '🟩',
                pkg: 'antigravity-automation',
                install: 'npm install antigravity-automation',
                registry: 'npm',
                registryUrl: 'https://www.npmjs.com/package/antigravity-automation',
                sourceUrl: 'https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/npm',
                runtime: 'Node.js ≥ 16',
                features: [
                    'Full TypeScript types & declarations',
                    'All 9 REST API endpoints',
                    'WebSocket stream with auto-reconnect',
                    'Configurable base URL & timeout',
                    'Zero config — works out of the box',
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
                stream: `const { AntigravityStream } = require('antigravity-automation');

const stream = new AntigravityStream();

stream.onConnected(() => console.log('Connected!'));
stream.onMessage((msg) => {
    console.log(\`[\${msg.title}] \${msg.content}\`);
});

stream.connect();`,
                config: `const client = new AntigravityClient({
    baseUrl: 'http://localhost:5000',  // default
    timeout: 10000,                     // ms, default
});

const stream = new AntigravityStream({
    url: 'ws://localhost:9812',  // default
    reconnect: true,              // auto-reconnect
    reconnectDelay: 3000,         // ms
});`,
                methods: [
                    { endpoint: 'POST /send_command', method: 'sendCommand(text)' },
                    { endpoint: 'POST /start-new-chat', method: 'startNewChat()' },
                    { endpoint: 'POST /switch_chat', method: 'switchChat(title)' },
                    { endpoint: 'POST /toggle_auto_run', method: 'toggleAutoRun()' },
                    { endpoint: 'POST /toggle_auto_allow', method: 'toggleAutoAllow()' },
                    { endpoint: 'GET /get_command', method: 'getCommand()' },
                    { endpoint: 'GET /stats', method: 'getStats()' },
                    { endpoint: 'POST /update', method: 'update(title, content)' },
                    { endpoint: 'POST /track_action', method: 'trackAction(action)' },
                    { endpoint: 'WS stream', method: 'new AntigravityStream()' },
                ],
            },
            python: {
                name: 'Python',
                icon: '🐍',
                pkg: 'antigravity-automation',
                install: 'pip install antigravity-automation',
                registry: 'PyPI',
                registryUrl: 'https://pypi.org/project/antigravity-automation/',
                sourceUrl: 'https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/python',
                runtime: 'Python ≥ 3.8',
                features: [
                    'Typed dataclasses for all responses',
                    'All 9 REST API endpoints',
                    'Async WebSocket stream with auto-reconnect',
                    'Configurable base URL & timeout',
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
                stream: `from antigravity_automation import AntigravityStream

stream = AntigravityStream()

stream.on_message(lambda msg: print(f"[{msg['title']}] {msg['content'][:80]}..."))
stream.on_connected(lambda: print("Connected!"))

stream.run()  # Blocking — runs asyncio event loop`,
                config: `client = AntigravityClient(
    base_url="http://localhost:5000",  # default
    timeout=10,                         # seconds
)

stream = AntigravityStream(
    url="ws://localhost:9812",   # default
    reconnect=True,              # auto-reconnect
    reconnect_delay=3.0,         # seconds
)`,
                methods: [
                    { endpoint: 'POST /send_command', method: 'send_command(text)' },
                    { endpoint: 'POST /start-new-chat', method: 'start_new_chat()' },
                    { endpoint: 'POST /switch_chat', method: 'switch_chat(title)' },
                    { endpoint: 'POST /toggle_auto_run', method: 'toggle_auto_run()' },
                    { endpoint: 'POST /toggle_auto_allow', method: 'toggle_auto_allow()' },
                    { endpoint: 'GET /get_command', method: 'get_command()' },
                    { endpoint: 'GET /stats', method: 'get_stats()' },
                    { endpoint: 'POST /update', method: 'update(title, content)' },
                    { endpoint: 'POST /track_action', method: 'track_action(action)' },
                    { endpoint: 'WS stream', method: 'AntigravityStream()' },
                ],
            }
        };

        const sdk = computed(() => sdks[active.value]);
        const hiQuickstart = computed(() => hi(sdk.value.quickstart));
        const hiStream = computed(() => hi(sdk.value.stream));
        const hiConfig = computed(() => hi(sdk.value.config));

        return { active, copied, copy, sdk, hiQuickstart, hiStream, hiConfig };
    },
    template: `
    <div class="view-enter">
        <!-- Hero -->
        <section class="pt-28 pb-8 grid-pattern">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">Official Libraries</span>
                <h1 class="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">SDKs</h1>
                <p class="text-slate-400 max-w-xl mx-auto mb-8">Official client libraries for the <a href="https://antigravityautomation.com" class="text-blue-400 hover:underline">Antigravity Automation</a> extension. Install in seconds, fully typed, and ready for production.</p>

                <!-- SDK Switcher -->
                <div class="inline-flex items-center gap-2 p-1.5 glass rounded-xl">
                    <button @click="active = 'nodejs'" :class="['px-6 py-2.5 rounded-lg font-bold text-sm transition-all', active === 'nodejs' ? 'bg-green-500/20 text-green-400 shadow-lg' : 'text-slate-400 hover:text-white']">🟩 Node.js</button>
                    <button @click="active = 'python'" :class="['px-6 py-2.5 rounded-lg font-bold text-sm transition-all', active === 'python' ? 'bg-blue-500/20 text-blue-400 shadow-lg' : 'text-slate-400 hover:text-white']">🐍 Python</button>
                </div>
            </div>
        </section>

        <!-- SDK Content -->
        <section class="max-w-3xl mx-auto px-4 sm:px-6 py-10">

            <!-- Header -->
            <div class="flex items-center gap-4 mb-8">
                <div class="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-3xl">{{sdk.icon}}</div>
                <div>
                    <h2 class="text-2xl font-bold text-white">{{sdk.name}} SDK</h2>
                    <p class="text-sm text-slate-500 font-mono">{{sdk.pkg}}</p>
                </div>
                <div class="ml-auto flex gap-2">
                    <a :href="sdk.registryUrl" class="px-3 py-1.5 glass text-xs font-bold text-slate-400 rounded-lg hover:text-white transition-colors">{{sdk.registry}} ↗</a>
                    <a :href="sdk.sourceUrl" class="px-3 py-1.5 glass text-xs font-bold text-slate-400 rounded-lg hover:text-white transition-colors">Source ↗</a>
                </div>
            </div>

            <!-- Install -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Install</div>
                <div class="code-block relative group">
                    <div class="code-body" style="padding:14px 18px;font-size:14px">{{sdk.install}}</div>
                    <button @click="copy(sdk.install, 'install')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'install' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">
                        {{copied === 'install' ? '✓ Copied' : 'Copy'}}
                    </button>
                </div>
            </div>

            <!-- Quick Start -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Quick Start</div>
                <div class="code-block relative group">
                    <div class="code-header">
                        <div class="code-dot" style="background:#ff5f57"></div>
                        <div class="code-dot" style="background:#febc2e"></div>
                        <div class="code-dot" style="background:#28c840"></div>
                        <span class="text-xs text-slate-600 font-mono ml-2">{{active === 'nodejs' ? 'app.js' : 'app.py'}}</span>
                    </div>
                    <div class="code-body" v-html="hiQuickstart"></div>
                    <button @click="copy(sdk.quickstart, 'quickstart')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'quickstart' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">
                        {{copied === 'quickstart' ? '✓ Copied' : 'Copy'}}
                    </button>
                </div>
            </div>

            <!-- WebSocket Stream -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">WebSocket Stream</div>
                <div class="code-block relative group">
                    <div class="code-header">
                        <div class="code-dot" style="background:#ff5f57"></div>
                        <div class="code-dot" style="background:#febc2e"></div>
                        <div class="code-dot" style="background:#28c840"></div>
                        <span class="text-xs text-slate-600 font-mono ml-2">{{active === 'nodejs' ? 'stream.js' : 'stream.py'}}</span>
                    </div>
                    <div class="code-body" v-html="hiStream"></div>
                    <button @click="copy(sdk.stream, 'stream')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'stream' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">
                        {{copied === 'stream' ? '✓ Copied' : 'Copy'}}
                    </button>
                </div>
            </div>

            <!-- Features -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Features</div>
                <div class="glass rounded-xl p-6">
                    <ul class="space-y-2 text-sm text-slate-400">
                        <li v-for="f in sdk.features" :key="f" class="flex items-center gap-2">
                            <span :class="active === 'nodejs' ? 'text-green-400' : 'text-blue-400'">✓</span> {{f}}
                        </li>
                        <li class="flex items-center gap-2">
                            <span :class="active === 'nodejs' ? 'text-green-400' : 'text-blue-400'">✓</span> Requires: <strong class="text-white">{{sdk.runtime}}</strong>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- API Methods -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">API Methods</div>
                <div class="glass rounded-xl overflow-hidden">
                    <table class="w-full text-sm">
                        <thead><tr class="text-left border-b border-slate-700"><th class="py-3 px-4 text-slate-500 font-mono text-xs">Endpoint</th><th class="py-3 px-4 text-slate-500 font-mono text-xs">Method</th></tr></thead>
                        <tbody class="font-mono text-xs">
                            <tr v-for="m in sdk.methods" :key="m.endpoint" class="border-b border-slate-800/50">
                                <td class="py-2.5 px-4">
                                    <span :class="m.endpoint.startsWith('GET') ? 'text-blue-400' : m.endpoint.startsWith('WS') ? 'text-purple-400' : 'text-green-400'" class="font-bold">{{m.endpoint.split(' ')[0]}}</span>
                                    <span class="text-slate-400 ml-1">{{m.endpoint.split(' ').slice(1).join(' ')}}</span>
                                </td>
                                <td class="py-2.5 px-4 text-white">{{m.method}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Configuration -->
            <div class="mb-8">
                <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Configuration</div>
                <div class="code-block relative group">
                    <div class="code-header">
                        <div class="code-dot" style="background:#ff5f57"></div>
                        <div class="code-dot" style="background:#febc2e"></div>
                        <div class="code-dot" style="background:#28c840"></div>
                        <span class="text-xs text-slate-600 font-mono ml-2">config</span>
                    </div>
                    <div class="code-body" v-html="hiConfig"></div>
                    <button @click="copy(sdk.config, 'config')" class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono transition-all" :class="copied === 'config' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-white'">
                        {{copied === 'config' ? '✓ Copied' : 'Copy'}}
                    </button>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
            <div class="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glow-indigo">
                <div class="absolute inset-0 grid-pattern opacity-50"></div>
                <div class="relative">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Need a different language?</h2>
                    <p class="text-slate-400 mb-8 max-w-lg mx-auto">Check out copy-paste code examples in 8 languages, or use the REST API directly from any HTTP client.</p>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#/code-examples" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg transition-all hover:scale-105 font-bold text-sm">Code Examples →</a>
                        <a href="https://antigravityautomation.com/api/" class="px-6 py-3 glass text-white rounded-xl transition-all hover:scale-105 font-medium text-sm border border-slate-700 hover:border-slate-600">Interactive API Docs →</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `
};
