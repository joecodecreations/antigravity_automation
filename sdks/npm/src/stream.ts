import WebSocket from 'ws';
import { EventEmitter } from 'events';

export interface StreamMessage {
    title: string;
    content: string;
}

export interface AntigravityStreamConfig {
    /** WebSocket URL (default: ws://localhost:9812) */
    url?: string;
    /** Auto-reconnect on disconnect (default: true) */
    reconnect?: boolean;
    /** Reconnect delay in ms (default: 3000) */
    reconnectDelay?: number;
}

export class AntigravityStream extends EventEmitter {
    private url: string;
    private reconnect: boolean;
    private reconnectDelay: number;
    private ws: WebSocket | null = null;
    private closed = false;

    constructor(config: AntigravityStreamConfig = {}) {
        super();
        this.url = config.url || 'ws://localhost:9812';
        this.reconnect = config.reconnect !== false;
        this.reconnectDelay = config.reconnectDelay || 3000;
    }

    /** Connect to the WebSocket stream */
    connect(): this {
        this.closed = false;
        this.ws = new WebSocket(this.url);

        this.ws.on('open', () => {
            this.emit('connected');
        });

        this.ws.on('message', (raw: Buffer | string) => {
            try {
                const data: StreamMessage = JSON.parse(raw.toString());
                this.emit('message', data);
            } catch {
                this.emit('error', new Error(`Invalid JSON: ${raw}`));
            }
        });

        this.ws.on('close', () => {
            this.emit('disconnected');
            if (this.reconnect && !this.closed) {
                setTimeout(() => this.connect(), this.reconnectDelay);
            }
        });

        this.ws.on('error', (err: Error) => {
            this.emit('error', err);
        });

        return this;
    }

    /** Disconnect from the stream */
    disconnect(): void {
        this.closed = true;
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /** Listen for chat messages */
    onMessage(handler: (msg: StreamMessage) => void): this {
        return this.on('message', handler);
    }

    /** Listen for connection events */
    onConnected(handler: () => void): this {
        return this.on('connected', handler);
    }

    /** Listen for disconnection events */
    onDisconnected(handler: () => void): this {
        return this.on('disconnected', handler);
    }

    /** Listen for errors */
    onError(handler: (err: Error) => void): this {
        return this.on('error', handler);
    }
}
