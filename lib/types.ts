// --- Shared Type Definitions ---

export interface Slot {
  time: string;
  available: boolean;
}

export type Status = 'idle' | 'loading' | 'success' | 'error' | 'confirmed'; 