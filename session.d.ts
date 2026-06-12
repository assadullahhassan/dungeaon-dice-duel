import 'express-session';

declare module 'express-session' {
    interface SessionData {
        runId: number; // Add your custom properties here
    }
}