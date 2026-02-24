const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

// ── Simple hash router ──────────────────────────────
const currentHash = ref(window.location.hash || '#/');
window.addEventListener('hashchange', () => {
    currentHash.value = window.location.hash || '#/';
    window.scrollTo(0, 0);
});

// ── Header ──────────────────────────────────────────
const SiteHeader = {
    setup() {
        return { currentHash };
    },
    template: `
    <header class="fixed top-0 w-full z-50 glass-strong">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <a href="#/" class="flex items-center gap-3 group">
                <img src="src/images/icon.png" alt="Logo" class="w-8 h-8 rounded-lg">
                <span class="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">Antigravity <span class="text-slate-500 font-normal">Automation</span></span>
            </a>
            <nav class="hidden md:flex items-center gap-6 text-sm">
                <a href="#/" :class="currentHash === '#/' ? 'text-white' : 'text-slate-400 hover:text-white'" class="transition-colors">Home</a>
                <a href="#/install" :class="currentHash === '#/install' ? 'text-white' : 'text-slate-400 hover:text-white'" class="transition-colors">Install</a>
                <a href="#/code-examples" :class="currentHash === '#/code-examples' ? 'text-white' : 'text-slate-400 hover:text-white'" class="transition-colors">Code Examples</a>
                <a href="#/sdks" :class="currentHash === '#/sdks' ? 'text-white' : 'text-slate-400 hover:text-white'" class="transition-colors">SDKs</a>
                <a href="https://antigravityautomation.com/api/" class="text-slate-400 hover:text-white transition-colors font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-blue-500/50">API Docs ↗</a>
            </nav>
        </div>
    </header>
    `
};

// ── Footer ──────────────────────────────────────────
const SiteFooter = {
    template: `
    <footer class="border-t border-slate-800 py-10">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <img src="src/images/icon.png" alt="Logo" class="w-6 h-6 rounded">
                <span class="text-sm text-slate-500">© 2025 Antigravity Automation · <a href="https://github.com/joecodecreations" class="hover:text-white transition-colors">JoeCodeCreations</a></span>
            </div>
            <div class="flex items-center gap-6 text-sm">
                <a href="#/install" class="text-slate-500 hover:text-white transition-colors">Install</a>
                <a href="#/code-examples" class="text-slate-500 hover:text-white transition-colors">Code Examples</a>
                <a href="#/sdks" class="text-slate-500 hover:text-white transition-colors">SDKs</a>
                <a href="https://antigravityautomation.com/api/" class="text-slate-500 hover:text-white transition-colors">API Docs</a>
                <a href="https://github.com/joecodecreations/antigravity_automation" class="text-slate-500 hover:text-white transition-colors">GitHub</a>
            </div>
        </div>
    </footer>
    `
};

// ── App ─────────────────────────────────────────────
const app = createApp({
    setup() {
        const currentView = computed(() => {
            switch (currentHash.value) {
                case '#/install': return 'install-view';
                case '#/code-examples': return 'code-examples-view';
                case '#/sdks': return 'sdks-view';
                default: return 'home-view';
            }
        });
        return { currentView };
    }
});

app.component('site-header', SiteHeader);
app.component('site-footer', SiteFooter);
app.component('home-view', HomeView);
app.component('install-view', InstallView);
app.component('code-examples-view', CodeExamplesView);
app.component('sdks-view', SdksView);
app.mount('#app');
