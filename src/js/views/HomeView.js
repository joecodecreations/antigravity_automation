const HomeView = {
    setup() {
        const faqs = [
            { q: 'Is my data safe?', a: 'Yes. The extension runs entirely on your local machine. No data is sent to any external server, API, or third party. Your code and conversations stay on localhost.' },
            { q: 'Do I need an additional AI subscription?', a: 'No. Antigravity Automation leverages your existing Antigravity subscription. It just adds automation and remote control on top.' },
            { q: 'What can I integrate it with?', a: 'Anything that speaks HTTP or WebSocket — Python scripts, Node.js apps, cron jobs, Cursor, CI/CD pipelines, other AI agents like Moltbot, and more.' },
            { q: 'How do I install it?', a: 'Download the .vsix file, open VS Code, run Extensions: Install from VSIX, and select the file. The bridge auto-installs on first activation.' },
            { q: 'Can I change the ports?', a: 'Yes. Both the HTTP port (default 5000) and WebSocket port (default 9812) are configurable via VS Code Settings under bridge.httpPort and bridge.wsPort.' },
        ];
        const openFaq = ref(null);
        const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i; };
        return { faqs, openFaq, toggleFaq };
    },
    template: `
    <!-- Hero -->
    <section class="relative flex items-center justify-center overflow-hidden grid-pattern">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float" style="animation-delay:2s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div class="relative max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-12">
            <div class="animate-fade-in-up mb-6">
                <img src="src/images/icon.png" alt="Antigravity Automation" class="w-36 h-36 mx-auto rounded-2xl shadow-2xl shadow-blue-500/20">
            </div>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 animate-fade-in-up delay-100">Antigravity Automation Extension</h1>
            <p class="text-base sm:text-lg text-slate-400 mb-8 animate-fade-in-up delay-150">Antigravity's #1 Extension to allow <span class="text-blue-400 font-semibold">autonomous control</span> and <span class="text-purple-400 font-semibold">remote execution</span></p>
            <p class="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                <span class="text-blue-400 font-semibold">Completely automate your IDE</span>
                <span class="text-white"> with automatic approvals and remote execution of chat interactions</span>
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                <a href="https://github.com/joecodecreations/antigravity_automation" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 font-bold text-base inline-flex items-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View on GitHub
                </a>
                <a href="#/code-examples" class="px-8 py-4 glass hover:bg-slate-800/80 text-white rounded-2xl transition-all hover:scale-105 font-medium text-base border border-slate-700 hover:border-slate-600">Code Examples →</a>
            </div>
        </div>
    </section>

    <!-- Logo Showcase -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        <div class="glass-strong rounded-2xl p-8 shadow-2xl shadow-black/40 glow-blue animate-fade-in-up">
            <img src="src/images/logo2.jpg" alt="Antigravity Automation" class="float-left w-48 md:w-64 rounded-xl mr-6 mb-4 shadow-lg">
            <div class="text-left">
                <h2 class="text-2xl font-bold text-white mb-3">Your AI IDE, Now <span class="text-blue-400 font-extrabold italic">Fully</span> Automated</h2>
                <p class="text-base font-semibold italic text-blue-400/90 leading-relaxed mb-4">Antigravity Automation is a VS Code extension that eliminates manual interaction with your AI coding assistant. It automatically clicks "Run" and "Allow" buttons, sends commands via a local REST API, and streams live chat outputs over WebSocket — all running 100% on your machine.</p>
                <p class="text-base font-semibold italic text-blue-400/90 leading-relaxed">Orchestrate AI workflows from Python scripts, CI/CD pipelines, cron jobs, or other AI agents. Connect your systems to Antigravity and let the automation handle the rest.</p>
            </div>
            <div style="clear:both"></div>
        </div>
    </section>

    <!-- Stats -->
    <section class="border-y border-slate-800 bg-slate-900/80">
        <div class="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center"><div class="text-2xl md:text-3xl font-extrabold text-white font-mono mb-1">100%</div><div class="text-xs text-slate-500 uppercase tracking-widest font-mono">Local & Private</div></div>
            <div class="text-center"><div class="text-2xl md:text-3xl font-extrabold text-white font-mono mb-1">8</div><div class="text-xs text-slate-500 uppercase tracking-widest font-mono">API Endpoints</div></div>
            <div class="text-center"><div class="text-2xl md:text-3xl font-extrabold text-white font-mono mb-1">Real-Time</div><div class="text-xs text-slate-500 uppercase tracking-widest font-mono">WebSocket Stream</div></div>
            <div class="text-center"><div class="text-2xl md:text-3xl font-extrabold text-white font-mono mb-1">&lt; 1s</div><div class="text-xs text-slate-500 uppercase tracking-widest font-mono">Click Automation</div></div>
        </div>
    </section>

    <!-- Features -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div class="text-center mb-14">
            <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">Capabilities</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Everything You Need to <span class="text-purple-400">Automate</span></h2>
            <p class="text-slate-400 mt-4 max-w-xl mx-auto">A complete automation bridge between your external systems and the Antigravity IDE.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="glass rounded-2xl p-6 hover-lift group" v-for="f in [
                {icon:'🚀',title:'Auto-Click Automation',desc:'Automatically clicks Run and Allow buttons so you never babysit long-running AI sessions.',bg:'blue'},
                {icon:'⚡',title:'Remote Control API',desc:'Send prompts, start new chats, and switch conversations programmatically via a local REST API.',bg:'purple'},
                {icon:'📡',title:'Live WebSocket Stream',desc:'Stream chat outputs in real-time to your scripts, dashboards, or AI agents via WebSocket.',bg:'green'},
                {icon:'🔒',title:'100% Local & Private',desc:'Everything runs on your machine. Zero data leaves localhost. Your code stays yours.',bg:'orange'},
                {icon:'🔗',title:'External Integration',desc:'Connect to Moltbot, cron jobs, Cursor, CI/CD pipelines, or any HTTP-speaking system.',bg:'indigo'},
                {icon:'🎛️',title:'Control Dashboard',desc:'Interactive webview UI inside VS Code for toggling states and monitoring real-time activity.',bg:'cyan'}
            ]" :key="f.title">
                <div :class="'w-12 h-12 rounded-xl bg-'+f.bg+'-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform'">{{f.icon}}</div>
                <h3 class="text-lg font-bold text-white mb-2">{{f.title}}</h3>
                <p class="text-sm text-slate-400 leading-relaxed">{{f.desc}}</p>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="border-y border-slate-800 bg-slate-900/50 py-20">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="text-center mb-14">
                <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">How It Works</span>
                <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Three Simple Steps</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center" v-for="(s, i) in [{t:'Install Extension',d:'Install the VSIX in VS Code. The bridge auto-installs into your workbench on activation.',c:'blue'},{t:'Open Dashboard',d:'Run Start Antigravity Bridge to open the control center and toggle automation.',c:'purple'},{t:'Automate Everything',d:'Send commands via API, stream outputs, and let the auto-clicker handle the rest.',c:'green'}]" :key="i">
                    <div :class="'w-16 h-16 rounded-2xl glass mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-'+s.c+'-400'">{{i+1}}</div>
                    <h3 class="text-white font-bold mb-2">{{s.t}}</h3>
                    <p class="text-sm text-slate-400">{{s.d}}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- API -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div class="text-center mb-14">
            <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">Developer API</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Full Control via <span class="text-blue-400">REST</span> & <span class="text-green-400">WebSocket</span></h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="glass rounded-xl p-5 hover-lift" v-for="e in [
                {m:'POST',c:'green',p:'/send_command',d:'Enqueue a prompt to the active AI chat'},
                {m:'POST',c:'green',p:'/start-new-chat',d:'Start a fresh chat session'},
                {m:'POST',c:'green',p:'/switch_chat',d:'Switch to a specific conversation by title'},
                {m:'POST',c:'green',p:'/toggle_auto_run',d:'Toggle the auto-click Run button feature'},
                {m:'POST',c:'green',p:'/toggle_auto_allow',d:'Toggle the auto-approve permission setting'},
                {m:'GET',c:'blue',p:'/stats',d:'Get cumulative usage metrics'},
                {m:'GET',c:'blue',p:'/get_command',d:'Poll for queued commands and current state'},
                {m:'WS',c:'purple',p:'ws://localhost:9812',d:'Real-time chat output stream'}
            ]" :key="e.p">
                <div class="flex items-center gap-2 mb-2">
                    <span :class="'text-xs font-bold font-mono px-2 py-0.5 rounded bg-'+e.c+'-500/20 text-'+e.c+'-400'">{{e.m}}</span>
                    <code class="text-sm font-mono text-white">{{e.p}}</code>
                </div>
                <p class="text-xs text-slate-500">{{e.d}}</p>
            </div>
        </div>
        <div class="text-center">
            <a href="https://antigravityautomation.com/docs/" class="px-6 py-3 glass hover:bg-slate-800/80 text-white rounded-xl transition-all font-medium text-sm border border-slate-700 hover:border-blue-500/50 inline-flex items-center gap-2"><span>Interactive API Docs</span><span>→</span></a>
            <a href="#/code-examples" class="ml-4 px-6 py-3 glass hover:bg-slate-800/80 text-white rounded-xl transition-all font-medium text-sm border border-slate-700 hover:border-purple-500/50 inline-flex items-center gap-2"><span>Code Examples</span><span>→</span></a>
        </div>
    </section>

    <!-- Screenshots -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div class="text-center mb-12">
            <span class="text-xs font-mono text-green-400 uppercase tracking-widest">See It In Action</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Built for Developers</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="glass rounded-2xl overflow-hidden hover-lift group">
                <img src="src/images/blue_run_button_click_required.png" alt="Auto-click the Run button" class="w-full" loading="lazy">
                <div class="p-4"><h3 class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Auto-Click Automation</h3><p class="text-xs text-slate-500 mt-1">Never click "Run" or "Allow" manually again.</p></div>
            </div>
            <div class="glass rounded-2xl overflow-hidden hover-lift group">
                <img src="src/images/remote_control_feature.png" alt="Remote Control" class="w-full" loading="lazy">
                <div class="p-4"><h3 class="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Remote Control via API</h3><p class="text-xs text-slate-500 mt-1">Send commands from Python, Node.js, cURL, or any HTTP client.</p></div>
            </div>
        </div>
    </section>

    <!-- Pricing -->
    <section class="border-y border-slate-800 bg-slate-900/50 py-20">
        <div class="max-w-5xl mx-auto px-4 sm:px-6">
            <div class="text-center mb-14">
                <span class="text-xs font-mono text-purple-400 uppercase tracking-widest">Pricing</span>
                <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Simple, Fair Pricing</h2>
                <p class="text-slate-400 mt-4">Try every feature free. Upgrade only when you need unlimited access.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="glass rounded-2xl p-6 hover-lift">
                    <h3 class="text-lg font-bold text-white mb-1">Free</h3>
                    <div class="text-3xl font-extrabold text-white mb-4">$0</div>
                    <ul class="space-y-2 text-sm text-slate-400 mb-6"><li class="flex items-center gap-2"><span class="text-green-400">✓</span> Auto-click trial</li><li class="flex items-center gap-2"><span class="text-green-400">✓</span> Remote command trial</li><li class="flex items-center gap-2"><span class="text-green-400">✓</span> WebSocket streaming</li><li class="flex items-center gap-2"><span class="text-green-400">✓</span> Dashboard UI</li></ul>
                    <div class="text-xs text-slate-600 font-mono">Limited usage</div>
                </div>
                <div class="glass rounded-2xl p-6 hover-lift relative" style="border:2px solid transparent;background-image:linear-gradient(rgba(30,41,59,0.9),rgba(30,41,59,0.9)),linear-gradient(135deg,#58a6ff,#a855f7);background-origin:border-box;background-clip:padding-box,border-box;">
                    <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
                    <h3 class="text-lg font-bold text-white mb-1">Automation</h3>
                    <div class="text-3xl font-extrabold text-white mb-1">$4.99</div>
                    <div class="text-xs text-slate-500 mb-4">one-time · lifetime</div>
                    <ul class="space-y-2 text-sm text-slate-400 mb-6"><li class="flex items-center gap-2"><span class="text-blue-400">✓</span> <strong class="text-white">Unlimited</strong> Auto-Run</li><li class="flex items-center gap-2"><span class="text-blue-400">✓</span> <strong class="text-white">Unlimited</strong> Auto-Allow</li><li class="flex items-center gap-2"><span class="text-blue-400">✓</span> WebSocket streaming</li><li class="flex items-center gap-2"><span class="text-blue-400">✓</span> Dashboard UI</li></ul>
                </div>
                <div class="glass rounded-2xl p-6 hover-lift">
                    <h3 class="text-lg font-bold text-white mb-1">Remote Control</h3>
                    <div class="flex items-baseline gap-2 mb-1"><span class="text-3xl font-extrabold text-white">$9.99</span><span class="text-sm text-slate-500">/mo</span></div>
                    <div class="text-xs text-slate-500 mb-4">or $49 one-time · lifetime</div>
                    <ul class="space-y-2 text-sm text-slate-400 mb-6"><li class="flex items-center gap-2"><span class="text-purple-400">✓</span> Everything in Automation</li><li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong class="text-white">Unlimited</strong> remote commands</li><li class="flex items-center gap-2"><span class="text-purple-400">✓</span> <strong class="text-white">Unlimited</strong> chat management</li><li class="flex items-center gap-2"><span class="text-purple-400">✓</span> Full API access</li></ul>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div class="text-center mb-14">
            <span class="text-xs font-mono text-blue-400 uppercase tracking-widest">FAQ</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mt-3">Common Questions</h2>
        </div>
        <div class="space-y-3">
            <div v-for="(faq, i) in faqs" :key="i" class="glass rounded-xl overflow-hidden transition-all" :style="openFaq === i ? 'border-color:rgba(88,166,255,0.3)' : ''">
                <button @click="toggleFaq(i)" class="w-full p-5 flex items-center justify-between text-left">
                    <h3 class="text-sm font-bold text-white">{{faq.q}}</h3>
                    <span class="text-slate-600 text-lg">{{openFaq === i ? '−' : '+'}}</span>
                </button>
                <div v-show="openFaq === i" class="px-5 pb-5 border-t border-slate-800">
                    <p class="text-sm text-slate-400 pt-4 leading-relaxed">{{faq.a}}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div class="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden glow-indigo">
            <div class="absolute inset-0 grid-pattern opacity-50"></div>
            <div class="relative">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to automate your workflow?</h2>
                <p class="text-slate-400 mb-8 max-w-lg mx-auto">Stop clicking buttons. Start building pipelines.</p>
                <a href="https://github.com/joecodecreations/antigravity_automation" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl shadow-2xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 font-bold text-base inline-block">Get Started on GitHub</a>
            </div>
        </div>
    </section>

    <!-- Disclaimer -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <p class="text-center text-xs text-slate-600 leading-relaxed">Disclaimer: Antigravity Automation is an independent third-party extension. It is not affiliated with, endorsed by, or associated with Google LLC, Alphabet Inc., or any of their subsidiaries or products. All trademarks and product names are the property of their respective owners.</p>
    </section>
    `
};
