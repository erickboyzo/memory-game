<script lang="ts">
	import { gameState, updateGameState } from '$lib/stores/game-state-store';
	import {
		createGameBoardWithCards,
		GameBoard,
		gameEvents,
		GameScore,
		gameTimer,
		MultiPlayerScoreboard,
		WinnerDialog
	} from '$lib';
	import { dialogManager } from '$lib/utils/dialog-manager';
	import _ from 'lodash';

	let gameBoard = $state($gameState.gameBoard);
	let currentPlayerIndex = $state($gameState.currentPlayerIndex ?? 0);

	function updatePlayerMoves(): void {
		$gameState.players[currentPlayerIndex].moves++;
		moveToNextPlayer();
	}

	function updatePlayerScore(): void {
		$gameState.players[currentPlayerIndex].score++;
		moveToNextPlayer();
	}

	function moveToNextPlayer(): void {
		if ($gameState.players.length === 1) {
			return;
		}
		currentPlayerIndex = (currentPlayerIndex + 1) % $gameState.players.length;
		updateGameState({ currentPlayerIndex });
	}

	function checkForWinner(board: GameCard[][]): boolean {
		return board.every((card) =>
			card.every((gameCard) => gameCard.isMatched && gameCard.isFlipped)
		);
	}

	function getWinner(players: Player[]): Player {
		return _.maxBy(players, 'score')!;
	}

	function showWinnerDialog(): void {
		const winningPlayer = getWinner($gameState.players);
		dialogManager.show('winner', WinnerDialog, {
			result: {
				time: $gameTimer.seconds,
				winningPlayer,
				multiPlayer: $gameState.players.length > 1
			}
		});
	}

	function resetGame() {
		const newGameBoard = createGameBoardWithCards($gameState.gridSize, $gameState.selectedTheme);
		gameBoard = newGameBoard;
		currentPlayerIndex = 0;
		updateGameState({
			gameBoard: newGameBoard,
			currentPlayerIndex: 0,
			players: [...Array($gameState.numberOfPlayers)].fill(0).map((_, index) => {
				return { score: 0, name: 'Player ' + (index + 1), moves: 0 };
			})
		});
		gameEvents.resume();
	}

	$effect(() => {
		const gameBoard = $gameState.gameBoard ?? [];
		if (checkForWinner(gameBoard)) {
			gameTimer.stop();
			showWinnerDialog();
		}
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
			{:else}
				<GameScore moves={$gameState.players[0].moves} />
			{/if}
		{/if}
	</div>
</div>
