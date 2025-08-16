<script lang="ts">
	import { gameState, updateGameState } from '$lib/stores/game-state-store';
	import {
		createGameBoardWithCards,
		dialogIds,
		GameBoard,
		gameEvents,
		GameScore,
		gameTimer,
		MultiPlayerScoreboard,
		WinnerDialog
	} from '$lib';
	import { dialogManager } from '$lib/utils/dialog-manager';
	import _ from 'lodash';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let gameBoard = $state($gameState.gameBoard);
	let currentPlayerIndex = $state($gameState.currentPlayerIndex ?? 0);

	function updatePlayerMoves(): void {
		checkForWinner();
		$gameState.players[currentPlayerIndex].moves++;
		moveToNextPlayer();
	}

	function updatePlayerScore(): void {
		checkForWinner();
		$gameState.players[currentPlayerIndex].score++;
		moveToNextPlayer();
	}

	function checkForWinner() {
		if (isGameOver($gameState.gameBoard as GameCard[][])) {
			showWinnerDialog();
		}
	}

	function moveToNextPlayer(): void {
		if ($gameState.players.length === 1) {
			return;
		}
		currentPlayerIndex = (currentPlayerIndex + 1) % $gameState.players.length;
		updateGameState({ currentPlayerIndex });
	}

	function isGameOver(board: GameCard[][]): boolean {
		if (!board) return false;
		return board.every((card) =>
			card.every((gameCard) => gameCard.isMatched && gameCard.isFlipped)
		);
	}

	function getWinner(players: Player[]): Player | null {
		if (!players || players.length === 0) return null;
		const maxScore = _.maxBy(players, 'score')!.score;
		const playersWithMaxScore = _.filter(players, (p) => p.score === maxScore);

		return playersWithMaxScore.length === 1 ? playersWithMaxScore[0] : null;
	}

	function showWinnerDialog(): void {
		gameTimer.stop();
		gameEvents.pause();
		const result = {
			time: $gameTimer.seconds,
			winningPlayer: getWinner($gameState.players),
			players: [...$gameState.players].sort((a, b) => b.score - a.score),
			multiPlayer: $gameState.players.length > 1
		};

		dialogManager.showDialog(dialogIds.WINNER_DIALOG, WinnerDialog, {
			result,
			onResetGame() {
				gameEvents.restart();
				dialogManager.close(dialogIds.WINNER_DIALOG);
			},
			onNewGame() {
				updateGameState({
					gameInProgress: false,
					players: [],
					currentPlayerIndex: 0
				});
				dialogManager.close(dialogIds.WINNER_DIALOG);
				goto('/');
			}
		});
	}

	function resetGame() {
		const newGameBoard = createGameBoardWithCards($gameState.gridSize, $gameState.selectedTheme);

		updateGameState({
			gameBoard: newGameBoard,
			currentPlayerIndex: 0,
			players: [...Array($gameState.numberOfPlayers)].fill(0).map((_, index) => {
				return { score: 0, name: 'Player ' + (index + 1), moves: 0 };
			})
		});

		gameBoard = newGameBoard;
		currentPlayerIndex = 0;

		if ($gameState.players.length === 1) {
			gameTimer.reset();
			gameTimer.start();
		}
		gameEvents.resume();
	}
	onMount(() => {
		// handles on page refresh
		checkForWinner();
	});

	$effect(() => {
		if ($gameEvents?.type === 'restart') {
			resetGame();
		}
	});
</script>

<div class="grid grid-cols-12 md:px-4">
	<div class="col-span-12 md:col-span-10 md:col-start-2">
		<GameBoard bind:gameBoard updateMoves={updatePlayerMoves} updateScore={updatePlayerScore} />
		{#if gameBoard}
			{#if $gameState.players.length > 1}
				<MultiPlayerScoreboard players={$gameState.players} currentPlayerId={currentPlayerIndex} />
			{:else if $gameState.players.length === 1}
				<GameScore moves={$gameState?.players[0]?.moves} />
			{/if}
		{/if}
	</div>
</div>
