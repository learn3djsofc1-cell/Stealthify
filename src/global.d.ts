import type { Buffer as BufferType } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof BufferType;
    global: typeof globalThis;
  }
}

export {};
