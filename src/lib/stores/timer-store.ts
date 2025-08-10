import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import debounce from 'lodash/debounce';

interface TimerStore {
	seconds: number;
	isRunning: boolean;
	startTime: number | null;
	animationFrameId: number | null;
}

const STORAGE_KEY = 'game_timer';
const SAVE_DELAY = 1000;

function createTimer() {
	const initialSeconds = browser ? Number(localStorage.getItem(STORAGE_KEY)) || 0 : 0;

	const store: Writable<TimerStore> = writable({
		seconds: initialSeconds,
		isRunning: false,
		startTime: null,
		animationFrameId: null
	});

	let unsubscribe: (() => void) | null = null;
	let currentState: TimerStore;

	// Debounced save function
	const saveToStorage = debounce((seconds: number) => {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, seconds.toString());
			} catch (error) {
				console.error('Error saving timer to localStorage:', error);
			}
		}
	}, SAVE_DELAY);

	function initializeSubscription() {
		if (!unsubscribe) {
			unsubscribe = store.subscribe((value) => {
				currentState = value;
				// Save seconds when they change
				saveToStorage(value.seconds);
			});
		}
	}

	function cleanupSubscription() {
		if (unsubscribe) {
			unsubscribe();
			unsubscribe = null;
		}
		// Cancel any pending saves
		saveToStorage.cancel();
	}

	function tick() {
		if (!currentState?.startTime || !currentState?.isRunning) return;

		const currentSeconds = Math.floor((performance.now() - currentState.startTime) / 1000);
		if (currentSeconds > currentState.seconds) {
			store.update((s) => ({ ...s, seconds: currentSeconds }));
		}

		currentState.animationFrameId = requestAnimationFrame(tick);
	}

	function cleanup() {
		if (currentState?.animationFrameId) {
			cancelAnimationFrame(currentState.animationFrameId);
		}
		cleanupSubscription();
	}

	const timerStore = {
		subscribe: (run: (value: TimerStore) => void, invalidate?: (value?: TimerStore) => void) => {
			initializeSubscription();
			const unsubscribeStore = store.subscribe(run, invalidate);

			return () => {
				unsubscribeStore();
				cleanup();
			};
		},

		start: () => {
			initializeSubscription();
			store.update((s) => ({
				...s,
				isRunning: true,
				startTime: performance.now() - s.seconds * 1000
			}));
			tick();
		},

		stop: () => {
			if (currentState?.animationFrameId) {
				cancelAnimationFrame(currentState.animationFrameId);
			}
			store.update((s) => ({ ...s, isRunning: false }));
			saveToStorage.flush();
		},

		reset: () => {
			cleanup();
			store.set({
				seconds: 0,
				isRunning: false,
				startTime: null,
				animationFrameId: null
			});
			// Clear stored value
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
			saveToStorage.cancel();
		},

		pause: () => {
			if (currentState?.animationFrameId) {
				cancelAnimationFrame(currentState.animationFrameId);
			}
			store.update((s) => ({ ...s, isRunning: false }));
			saveToStorage.flush();
		},

		resume: () => {
			initializeSubscription();
			store.update((s) => ({
				...s,
				isRunning: true,
				// Resume from the current seconds count
				startTime: performance.now() - s.seconds * 1000
			}));
			tick();
		}
	};

	return timerStore;
}

export const gameTimer = createTimer();

export const formattedTime = derived(gameTimer, ($timer) => {
	const minutes = Math.floor($timer.seconds / 60);
	const remainingSeconds = $timer.seconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
});
