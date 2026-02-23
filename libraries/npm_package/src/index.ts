/**
 * Antigravity Automation — Node.js Client Library
 * 
 * Provides a typed client for the Antigravity Automation REST API
 * and WebSocket stream.
 */

import { AntigravityClient, AntigravityConfig } from './client';
import { AntigravityStream, StreamMessage } from './stream';
import type {
    ToggleResponse,
    SendCommandResponse,
    StartNewChatResponse,
    SwitchChatResponse,
    GetCommandResponse,
    UpdateResponse,
    StatsResponse,
    TrackActionResponse,
    UsageInfo,
    RemoteUsageSummary,
} from './types';

export {
    AntigravityClient,
    AntigravityConfig,
    AntigravityStream,
    StreamMessage,
    ToggleResponse,
    SendCommandResponse,
    StartNewChatResponse,
    SwitchChatResponse,
    GetCommandResponse,
    UpdateResponse,
    StatsResponse,
    TrackActionResponse,
    UsageInfo,
    RemoteUsageSummary,
};

// Default export for convenience
export default AntigravityClient;
