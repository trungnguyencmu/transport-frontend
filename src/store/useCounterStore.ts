import { create } from 'zustand';

// Define the types for the state and actions
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Create the Zustand store
export const useCounterStore = create<CounterState>((set) => ({
  count: 0, // Initial state
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set(() => ({ count: 0 })),
}));
