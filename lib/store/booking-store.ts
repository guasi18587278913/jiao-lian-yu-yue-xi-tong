import { create } from 'zustand'
import type { Slot, Status } from '@/lib/types'

// --- Store Interface ---
interface BookingState {
  date: Date | null;
  slot: Slot | null;
  status: Status;
  slots: Slot[];
  currentMonth: Date;
  setDate: (date: Date | null) => void;
  setSlot: (slot: Slot | null) => void;
  setStatus: (status: Status) => void;
  setSlots: (slots: Slot[]) => void;
  setCurrentMonth: (month: Date) => void;
  reset: () => void;
}

// --- Store Implementation ---
export const useBookingStore = create<BookingState>((set) => ({
  date: null,
  slot: null,
  status: 'idle',
  slots: [],
  currentMonth: new Date(),
  setDate: (date) => {
    set({ date, slot: null, status: date ? 'loading' : 'idle' });
  },
  setSlot: (slot) => set({ slot }),
  setStatus: (status) => set({ status }),
  setSlots: (slots) => set({ slots }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  reset: () => set({ date: null, slot: null, status: 'idle', slots: [] }),
})); 