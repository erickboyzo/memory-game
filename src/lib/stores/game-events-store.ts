import { writable } from 'svelte/store';

interface GameEvents {
	type: 'restart' | 'pause' | 'resume';
	timestamp: number;
}

function createGameEventStore() {
	const { subscribe, set } = writable<GameEvents | null>(null);

	return {
		subscribe,
		restart: () => set({ type: 'restart', timestamp: Date.now() }),
		pause: () => set({ type: 'pause', timestamp: Date.now() }),
		resume: () => set({ type: 'resume', timestamp: Date.now() }),
		reset: () => set(null)
	};
}

export const gameEvents = createGameEventStore();
