// place files you want to import through the `$lib` alias in this folder.
export { default as Card } from './components/GameCard.svelte';
export { default as SelectionButton } from './components/SelectionButton.svelte';
export { default as GameOptions } from './components/GameOptions.svelte';
export { default as Button } from './components/Button.svelte';
export { gameInProgress, selectedTheme, gameScore, numberOfPlayers, gridSize } from './stores';
