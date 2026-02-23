/** Response from toggle_auto_run */
export interface ToggleResponse {
    auto_run?: boolean;
    auto_allow?: boolean;
}

/** Response from send_command */
export interface SendCommandResponse {
    status: string;
    position: number;
    usage?: RemoteUsageSummary;
}

/** Response from start-new-chat */
export interface StartNewChatResponse {
    status: string;
}

/** Response from switch_chat */
export interface SwitchChatResponse {
    status: string;
    title: string;
    usage?: RemoteUsageSummary;
}

/** Response from get_command */
export interface GetCommandResponse {
    text: string | null;
    status: 'success' | 'no_command';
    auto_run: boolean;
    auto_allow: boolean;
    start_new_chat: boolean;
    switch_chat: string | null;
    usage?: UsageInfo;
}

/** Response from /update */
export interface UpdateResponse {
    status: string;
}

/** Response from /stats */
export interface StatsResponse {
    autoRunClicks: number;
    autoAllowClicks: number;
    remoteCommands: number;
    totalSessions: number;
    firstUsed: string;
    lastUsed: string;
}

/** Response from /track_action */
export interface TrackActionResponse {
    status: string;
    stats: StatsResponse;
}

/** Usage info embedded in responses */
export interface UsageInfo {
    autoClicks: number;
    remoteCommands: number;
    autoFreeRemaining: number;
    rcFreeRemaining: number;
}

/** Remote usage summary */
export interface RemoteUsageSummary {
    remoteCommands: number;
    freeRemaining: number;
}

/** Freemium blocked error */
export interface FreemiumError {
    error: string;
    upgrade_url: string;
    usage?: { remoteCommands: number; freeLimit: number };
}

/** Generic API error */
export interface ApiError {
    error: string;
}
