const SdksView = {
    template: `
    <div class="view-enter">
        <!-- Hero -->
        <section class="pt-28 pb-12 grid-pattern">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">Official Libraries</span>
                <h1 class="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">SDKs</h1>
                <p class="text-slate-400 max-w-xl mx-auto">Official client libraries for the <a href="https://antigravityautomation.com" class="text-blue-400 hover:underline">Antigravity Automation</a> extension. Install in seconds, fully typed, and ready for production.</p>
            </div>
        </section>

        <!-- SDK Cards -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- Node.js SDK -->
                <div class="glass-strong rounded-2xl p-8 hover-lift glow-blue">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-3xl">🟩</div>
                        <div>
                            <h2 class="text-xl font-bold text-white">Node.js SDK</h2>
                            <p class="text-xs text-slate-500 font-mono">antigravity-automation</p>
                        </div>
                    </div>

                    <p class="text-sm text-slate-400 mb-6 leading-relaxed">Full TypeScript support with typed responses. Includes REST client and WebSocket stream with auto-reconnect.</p>

                    <!-- Install -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Install</div>
                        <div class="code-block">
                            <div class="code-body" style="padding:12px 16px">npm install antigravity-automation</div>
                        </div>
                    </div>

                    <!-- Quick Start -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Quick Start</div>
                        <div class="code-block">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">app.js</span>
                            </div>
                            <div class="code-body"><span class="cmt">// Import the SDK</span>
const { AntigravityClient } = require(<span class="str">'antigravity-automation'</span>);

const client = <span class="kw">new</span> <span class="fn">AntigravityClient</span>();

<span class="cmt">// Send a command to the AI chat</span>
<span class="kw">await</span> client.<span class="fn">sendCommand</span>(<span class="str">'Refactor the auth module'</span>);

<span class="cmt">// Toggle auto-click automation</span>
<span class="kw">await</span> client.<span class="fn">toggleAutoRun</span>();

<span class="cmt">// Get usage statistics</span>
const stats = <span class="kw">await</span> client.<span class="fn">getStats</span>();
console.<span class="fn">log</span>(stats);</div>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Features</div>
                        <ul class="space-y-1.5 text-sm text-slate-400">
                            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Full TypeScript types & declarations</li>
                            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> All 9 REST API endpoints</li>
                            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> WebSocket stream with auto-reconnect</li>
                            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Configurable base URL & timeout</li>
                            <li class="flex items-center gap-2"><span class="text-green-400">✓</span> Node.js ≥ 16</li>
                        </ul>
                    </div>

                    <div class="flex gap-3">
                        <a href="https://www.npmjs.com/package/antigravity-automation" class="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-xs font-bold hover:bg-green-600/30 transition-colors">npm ↗</a>
                        <a href="https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/npm" class="px-4 py-2 glass text-slate-400 rounded-lg text-xs font-bold hover:text-white transition-colors">Source ↗</a>
                    </div>
                </div>

                <!-- Python SDK -->
                <div class="glass-strong rounded-2xl p-8 hover-lift glow-purple">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-3xl">🐍</div>
                        <div>
                            <h2 class="text-xl font-bold text-white">Python SDK</h2>
                            <p class="text-xs text-slate-500 font-mono">antigravity-automation</p>
                        </div>
                    </div>

                    <p class="text-sm text-slate-400 mb-6 leading-relaxed">Typed dataclasses for every response. Sync REST client with requests and async WebSocket stream with auto-reconnect.</p>

                    <!-- Install -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Install</div>
                        <div class="code-block">
                            <div class="code-body" style="padding:12px 16px">pip install antigravity-automation</div>
                        </div>
                    </div>

                    <!-- Quick Start -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Quick Start</div>
                        <div class="code-block">
                            <div class="code-header">
                                <div class="code-dot" style="background:#ff5f57"></div>
                                <div class="code-dot" style="background:#febc2e"></div>
                                <div class="code-dot" style="background:#28c840"></div>
                                <span class="text-xs text-slate-600 font-mono ml-2">app.py</span>
                            </div>
                            <div class="code-body"><span class="kw">from</span> antigravity_automation <span class="kw">import</span> <span class="fn">AntigravityClient</span>

client = <span class="fn">AntigravityClient</span>()

<span class="cmt"># Send a command to the AI chat</span>
result = client.<span class="fn">send_command</span>(<span class="str">"Refactor the auth module"</span>)
<span class="fn">print</span>(result)  <span class="cmt"># SendCommandResponse(status='queued', ...)</span>

<span class="cmt"># Toggle auto-click automation</span>
client.<span class="fn">toggle_auto_run</span>()

<span class="cmt"># Get usage statistics</span>
stats = client.<span class="fn">get_stats</span>()
<span class="fn">print</span>(f<span class="str">"Auto-Run clicks: {stats.autoRunClicks}"</span>)</div>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="mb-6">
                        <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Features</div>
                        <ul class="space-y-1.5 text-sm text-slate-400">
                            <li class="flex items-center gap-2"><span class="text-blue-400">✓</span> Typed dataclasses for all responses</li>
                            <li class="flex items-center gap-2"><span class="text-blue-400">✓</span> All 9 REST API endpoints</li>
                            <li class="flex items-center gap-2"><span class="text-blue-400">✓</span> Async WebSocket stream with auto-reconnect</li>
                            <li class="flex items-center gap-2"><span class="text-blue-400">✓</span> Configurable base URL & timeout</li>
                            <li class="flex items-center gap-2"><span class="text-blue-400">✓</span> Python ≥ 3.8</li>
                        </ul>
                    </div>

                    <div class="flex gap-3">
                        <a href="https://pypi.org/project/antigravity-automation/" class="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-600/30 transition-colors">PyPI ↗</a>
                        <a href="https://github.com/joecodecreations/antigravity_automation/tree/main/sdks/python" class="px-4 py-2 glass text-slate-400 rounded-lg text-xs font-bold hover:text-white transition-colors">Source ↗</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- API Methods Reference -->
        <section class="border-y border-slate-800 bg-slate-900/50 py-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-10">
                    <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">Reference</span>
                    <h2 class="text-2xl md:text-3xl font-bold text-white mt-3">Available Methods</h2>
                    <p class="text-slate-400 mt-3 text-sm">Both SDKs provide the same methods for all API endpoints.</p>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="text-left border-b border-slate-700">
                                <th class="py-3 pr-4 text-slate-400 font-mono text-xs">Endpoint</th>
                                <th class="py-3 pr-4 text-slate-400 font-mono text-xs">Node.js</th>
                                <th class="py-3 text-slate-400 font-mono text-xs">Python</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-300 font-mono text-xs">
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /send_command</td><td class="py-2.5 pr-4">sendCommand(text)</td><td class="py-2.5">send_command(text)</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /start-new-chat</td><td class="py-2.5 pr-4">startNewChat()</td><td class="py-2.5">start_new_chat()</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /switch_chat</td><td class="py-2.5 pr-4">switchChat(title)</td><td class="py-2.5">switch_chat(title)</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /toggle_auto_run</td><td class="py-2.5 pr-4">toggleAutoRun()</td><td class="py-2.5">toggle_auto_run()</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /toggle_auto_allow</td><td class="py-2.5 pr-4">toggleAutoAllow()</td><td class="py-2.5">toggle_auto_allow()</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-blue-400">GET</span> /get_command</td><td class="py-2.5 pr-4">getCommand()</td><td class="py-2.5">get_command()</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-blue-400">GET</span> /stats</td><td class="py-2.5 pr-4">getStats()</td><td class="py-2.5">get_stats()</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /update</td><td class="py-2.5 pr-4">update(title, content)</td><td class="py-2.5">update(title, content)</td></tr>
                            <tr class="border-b border-slate-800"><td class="py-2.5 pr-4"><span class="text-green-400">POST</span> /track_action</td><td class="py-2.5 pr-4">trackAction(action)</td><td class="py-2.5">track_action(action)</td></tr>
                            <tr><td class="py-2.5 pr-4"><span class="text-purple-400">WS</span> ws://localhost:9812</td><td class="py-2.5 pr-4">AntigravityStream</td><td class="py-2.5">AntigravityStream</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Configuration -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <div class="text-center mb-10">
                <span class="text-xs font-mono text-green-400 uppercase tracking-widest">Configuration</span>
                <h2 class="text-2xl md:text-3xl font-bold text-white mt-3">Defaults &amp; Options</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass rounded-xl p-5">
                    <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Node.js</div>
                    <div class="code-block">
                        <div class="code-body"><span class="kw">const</span> client = <span class="kw">new</span> <span class="fn">AntigravityClient</span>({
  baseUrl: <span class="str">'http://localhost:5000'</span>,
  timeout: <span class="num">10000</span>,
});

<span class="kw">const</span> stream = <span class="kw">new</span> <span class="fn">AntigravityStream</span>({
  url: <span class="str">'ws://localhost:9812'</span>,
  reconnect: <span class="num">true</span>,
  reconnectDelay: <span class="num">3000</span>,
});</div>
                    </div>
                </div>
                <div class="glass rounded-xl p-5">
                    <div class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Python</div>
                    <div class="code-block">
                        <div class="code-body">client = <span class="fn">AntigravityClient</span>(
  base_url=<span class="str">"http://localhost:5000"</span>,
  timeout=<span class="num">10</span>,
)

stream = <span class="fn">AntigravityStream</span>(
  url=<span class="str">"ws://localhost:9812"</span>,
  reconnect=<span class="num">True</span>,
  reconnect_delay=<span class="num">3.0</span>,
)</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
            <div class="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glow-indigo">
                <div class="absolute inset-0 grid-pattern opacity-50"></div>
                <div class="relative">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Need a different language?</h2>
                    <p class="text-slate-400 mb-8 max-w-lg mx-auto">Check out our copy-paste code examples in 8 languages, or use the REST API directly from any HTTP client.</p>
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
