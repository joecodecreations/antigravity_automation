import type {
    ToggleResponse,
    SendCommandResponse,
    StartNewChatResponse,
    SwitchChatResponse,
    GetCommandResponse,
    UpdateResponse,
    StatsResponse,
    TrackActionResponse,
} from './types';

export interface AntigravityConfig {
    /** HTTP base URL (default: http://localhost:5000) */
    baseUrl?: string;
    /** Request timeout in ms (default: 10000) */
    timeout?: number;
}

export class AntigravityClient {
    private baseUrl: string;
    private timeout: number;

    constructor(config: AntigravityConfig = {}) {
        this.baseUrl = (config.baseUrl || 'http://localhost:5000').replace(/\/+$/, '');
        this.timeout = config.timeout || 10000;
    }

    // ── Private helpers ─────────────────────────

    private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);

        try {
            const opts: RequestInit = {
                method,
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
            };
            if (body) opts.body = JSON.stringify(body);

            const res = await fetch(`${this.baseUrl}${path}`, opts);

            if (!res.ok) {
                const err: any = await res.json().catch(() => ({ error: res.statusText }));
                throw Object.assign(new Error(err.error || `HTTP ${res.status}`), {
                    status: res.status,
                    response: err,
                });
            }

            return await res.json() as T;
        } finally {
            clearTimeout(timer);
        }
    }

    private post<T>(path: string, body?: unknown): Promise<T> {
        return this.request<T>('POST', path, body);
    }

    private get<T>(path: string): Promise<T> {
        return this.request<T>('GET', path);
    }

    // ── Automation ──────────────────────────────

    /** Toggle Auto-Run click automation */
    async toggleAutoRun(): Promise<ToggleResponse> {
        return this.post<ToggleResponse>('/toggle_auto_run');
    }

    /** Toggle Auto-Allow permission automation */
    async toggleAutoAllow(): Promise<ToggleResponse> {
        return this.post<ToggleResponse>('/toggle_auto_allow');
    }

    // ── Remote Control ──────────────────────────

    /** Send a prompt/command to the active AI chat */
    async sendCommand(text: string): Promise<SendCommandResponse> {
        return this.post<SendCommandResponse>('/send_command', { text });
    }

    /** Start a new chat session */
    async startNewChat(): Promise<StartNewChatResponse> {
        return this.post<StartNewChatResponse>('/start-new-chat');
    }

    /** Switch to an existing chat by title */
    async switchChat(title: string): Promise<SwitchChatResponse> {
        return this.post<SwitchChatResponse>('/switch_chat', { title });
    }

    // ── Content ─────────────────────────────────

    /** Poll for queued commands and current state */
    async getCommand(): Promise<GetCommandResponse> {
        return this.get<GetCommandResponse>('/get_command');
    }

    /** Push chat content (internal webhook) */
    async update(title: string, content: string): Promise<UpdateResponse> {
        return this.post<UpdateResponse>('/update', { title, content });
    }

    // ── Stats ───────────────────────────────────

    /** Get cumulative usage statistics */
    async getStats(): Promise<StatsResponse> {
        return this.get<StatsResponse>('/stats');
    }

    /** Track a usage action */
    async trackAction(action: 'auto_run' | 'auto_allow' | 'remote_command'): Promise<TrackActionResponse> {
        return this.post<TrackActionResponse>('/track_action', { action });
    }
}
