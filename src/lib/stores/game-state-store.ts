import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createPersistedStore<T>(key: string, initialValue: T) {
	const storedValue = browser ? localStorage.getItem(key) : null;
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;

	const store = writable<T>(initial);

	function saveToStorage(value: T) {
		if (browser) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(`Error saving to storage for key ${key}:`, error);
			}
		}
	}

	return {
		subscribe: store.subscribe,
		set: (value: T) => {
			saveToStorage(value);
			store.set(value);
		},
		update: (updater: (value: T) => T) => {
			store.update((currentValue) => {
				const newValue = updater(currentValue);
				saveToStorage(newValue);
				return newValue;
			});
		}
	};
}

const initialGameState: GameState = {
	gameInProgress: false,
	selectedTheme: 'numbers',
	gridSize: 4,
	players: [],
	numberOfPlayers: 1,
	currentPlayerIndex: 0
};

export const gameState = createPersistedStore('mg_gameState', initialGameState);

export const updateGameState = (updates: Partial<GameState>) => {
	gameState.update((current) => ({ ...current, ...updates }));
};
