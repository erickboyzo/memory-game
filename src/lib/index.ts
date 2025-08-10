// place files you want to import through the `$lib` alias in this folder.
export { default as Card } from './components/common/Card.svelte';
export { default as SelectionButton } from './components/common/SelectionButton.svelte';
export { default as GameOptions } from './components/forms/GameOptions.svelte';
export { default as Button } from './components/common/Button.svelte';
export { default as GameBoard } from './components/game-layouts/GameBoard.svelte';
export { default as GameScore } from './components/game-layouts/GameScore.svelte';
export { default as WinnerDialog } from './components/dialogs/WinnerDialog.svelte';
export { default as MultiPlayerScoreboard } from './components/game-layouts/MultiPlayerScoreboard.svelte';
export { default as BaseDialog } from './components/dialogs/BaseDialog.svelte';
export { default as MenuDialog } from './components/dialogs/MenuDialog.svelte';

export { gameTimer } from './stores/timer-store';
export { gameState } from './stores/game-state-store';
export { gameEvents } from './stores/game-events-store';
export { updateGameState } from './stores/game-state-store';

export { getIconPairs } from './utils/icons';
export { getShuffledNumberPairs } from './utils/numbers';
export { createGameBoardWithCards } from './utils/game-board';
export { dialogManager } from './utils/dialog-manager';

export { dialogIds } from '$lib/constants/dialog-ids';
