const InstallView = {
    template: `
    <!-- Hero -->
    <section class="relative flex items-center justify-center overflow-hidden grid-pattern">
        <div class="absolute top-20 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-float" style="animation-delay:2s"></div>
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 pb-12">
            <div class="animate-fade-in-up mb-6">
                <div class="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center text-5xl mx-auto">⬇️</div>
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 animate-fade-in-up delay-100">Install Antigravity Automation</h1>
            <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-150">Get fully automated IDE control in under 2 minutes. Available on the <span class="text-green-400 font-semibold">Open VSX Registry</span> for Antigravity.</p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                <a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation" target="_blank" class="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white rounded-2xl shadow-2xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95 font-bold text-base inline-flex items-center gap-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    Install from Open VSX
                </a>
            </div>
        </div>
    </section>

    <!-- What Is It -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div class="glass-strong rounded-2xl p-8 md:p-10 shadow-2xl shadow-black/40 glow-blue">
            <h2 class="text-2xl font-bold text-white mb-6">What is Antigravity Automation?</h2>
            <p class="text-slate-300 leading-relaxed mb-4">Antigravity Automation is an extension for the Antigravity IDE (VS Code) that <strong class="text-white">eliminates manual interaction</strong> with your AI coding assistant. Once installed, it:</p>
            <ul class="space-y-3 text-slate-400 mb-6">
                <li class="flex items-start gap-3"><span class="text-green-400 mt-0.5">✓</span><span><strong class="text-white">Auto-clicks "Run" and "Allow" buttons</strong> — no more babysitting long AI sessions</span></li>
                <li class="flex items-start gap-3"><span class="text-green-400 mt-0.5">✓</span><span><strong class="text-white">Provides a local REST API</strong> — send commands, start chats, and switch conversations from any script</span></li>
                <li class="flex items-start gap-3"><span class="text-green-400 mt-0.5">✓</span><span><strong class="text-white">Streams live chat output via WebSocket</strong> — pipe AI responses to your dashboards, agents, or CI/CD</span></li>
                <li class="flex items-start gap-3"><span class="text-green-400 mt-0.5">✓</span><span><strong class="text-white">Runs 100% locally</strong> — zero data leaves your machine, ever</span></li>
            </ul>
            <p class="text-slate-500 text-sm">Think of it as <em class="text-slate-300">the API layer for your AI IDE</em> — turning manual clicking into fully automated, scriptable workflows.</p>
        </div>
    </section>

    <!-- Installation Steps -->
    <section class="border-y border-slate-800 bg-slate-900/50 py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <span class="text-xs font-mono text-green-400 uppercase tracking-widest">Setup Guide</span>
                <h2 class="text-3xl font-bold text-white mt-3">Installation in 3 Steps</h2>
            </div>
            <div class="space-y-6">
                <div class="glass rounded-2xl p-6 hover-lift flex items-start gap-5">
                    <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-xl font-bold text-green-400 flex-shrink-0">1</div>
                    <div>
                        <h3 class="text-lg font-bold text-white mb-2">Download from Open VSX</h3>
                        <p class="text-sm text-slate-400 leading-relaxed mb-3">Visit the <a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation" target="_blank" class="text-blue-400 hover:underline">Open VSX Registry page</a> and click <strong class="text-white">Download</strong> to get the <code class="text-xs bg-slate-800 px-2 py-0.5 rounded font-mono text-green-400">.vsix</code> file.</p>
                        <a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation" target="_blank" class="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono">open-vsx.org/extension/joecodecreations/antigravity-automation ↗</a>
                    </div>
                </div>
                <div class="glass rounded-2xl p-6 hover-lift flex items-start gap-5">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl font-bold text-blue-400 flex-shrink-0">2</div>
                    <div>
                        <h3 class="text-lg font-bold text-white mb-2">Install in Antigravity</h3>
                        <p class="text-sm text-slate-400 leading-relaxed mb-3">Open Antigravity (VS Code) and install the extension:</p>
                        <div class="glass rounded-xl p-4 font-mono text-sm">
                            <div class="text-slate-500 mb-2"># Option A: Command Palette</div>
                            <div class="text-white mb-3">Ctrl+Shift+P → <span class="text-blue-400">Extensions: Install from VSIX</span> → select the file</div>
                            <div class="text-slate-500 mb-2"># Option B: Terminal</div>
                            <div class="text-white"><span class="text-green-400">code</span> --install-extension antigravity-automation-*.vsix</div>
                        </div>
                    </div>
                </div>
                <div class="glass rounded-2xl p-6 hover-lift flex items-start gap-5">
                    <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl font-bold text-purple-400 flex-shrink-0">3</div>
                    <div>
                        <h3 class="text-lg font-bold text-white mb-2">Reload & Go</h3>
                        <p class="text-sm text-slate-400 leading-relaxed">The extension auto-installs the bridge into your workbench on first activation. You'll see a <strong class="text-white">"Antigravity Bridge installed successfully!"</strong> notification and the window will reload. After that:</p>
                        <ul class="mt-3 space-y-2 text-sm text-slate-400">
                            <li class="flex items-center gap-2"><span class="text-purple-400">→</span> A <strong class="text-white">status bar button</strong> appears at the bottom to toggle auto-click</li>
                            <li class="flex items-center gap-2"><span class="text-purple-400">→</span> The local <strong class="text-white">REST API</strong> starts on <code class="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-blue-400">http://localhost:5000</code></li>
                            <li class="flex items-center gap-2"><span class="text-purple-400">→</span> <strong class="text-white">WebSocket streaming</strong> starts on <code class="text-xs bg-slate-800 px-1.5 py-0.5 rounded font-mono text-green-400">ws://localhost:9812</code></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- After Install -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div class="text-center mb-12">
            <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">What's Next</span>
            <h2 class="text-3xl font-bold text-white mt-3">After Installation</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="glass rounded-2xl p-6 hover-lift group">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🎛️</div>
                <h3 class="text-lg font-bold text-white mb-2">Open the Dashboard</h3>
                <p class="text-sm text-slate-400 leading-relaxed">Run <code class="text-xs bg-slate-800 px-2 py-0.5 rounded font-mono text-blue-400">Start Antigravity Bridge</code> from the Command Palette to open the control center. Toggle automation, view stats, and manage your license.</p>
            </div>
            <div class="glass rounded-2xl p-6 hover-lift group">
                <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📦</div>
                <h3 class="text-lg font-bold text-white mb-2">Use the SDKs</h3>
                <p class="text-sm text-slate-400 leading-relaxed">Install the <a href="https://www.npmjs.com/package/antigravity-automation" class="text-green-400 hover:underline">Node.js SDK</a> or <a href="https://pypi.org/project/antigravity-automation/" class="text-blue-400 hover:underline">Python SDK</a> to control the extension programmatically from your own scripts and workflows.</p>
            </div>
            <div class="glass rounded-2xl p-6 hover-lift group">
                <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📖</div>
                <h3 class="text-lg font-bold text-white mb-2">Explore the API</h3>
                <p class="text-sm text-slate-400 leading-relaxed">Check the <a href="https://antigravityautomation.com/api/" class="text-purple-400 hover:underline">Interactive API Docs</a> for a full Swagger UI with every endpoint, payload, and response documented.</p>
            </div>
            <div class="glass rounded-2xl p-6 hover-lift group">
                <div class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">💻</div>
                <h3 class="text-lg font-bold text-white mb-2">Run Code Examples</h3>
                <p class="text-sm text-slate-400 leading-relaxed">Ready-to-run samples in <a href="#/code-examples" class="text-orange-400 hover:underline">8 languages</a> — Python, JavaScript, Rust, Go, Ruby, PHP, C#, and cURL.</p>
            </div>
        </div>
    </section>

    <!-- Freemium Info -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div class="glass-strong rounded-2xl p-8 text-center">
            <h3 class="text-xl font-bold text-white mb-3">🎉 Free to Start</h3>
            <p class="text-slate-400 leading-relaxed max-w-xl mx-auto mb-4">Every feature works out of the box with generous free limits — <strong class="text-white">500 auto-clicks</strong> and <strong class="text-white">100 remote commands</strong>. No credit card required. Upgrade only when you need unlimited access.</p>
            <a href="https://open-vsx.org/extension/joecodecreations/antigravity-automation" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white rounded-xl shadow-lg transition-all hover:scale-105 font-bold text-sm">
                Install Now — It's Free
            </a>
        </div>
    </section>
    `
};
