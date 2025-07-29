import { writable } from 'svelte/store';

export const gameInProgress = writable(false);
export const selectedTheme = writable('numbers');
export const gridSize = writable(6);
export const numberOfPlayers = writable(1);
export const gameScore = writable(0);
