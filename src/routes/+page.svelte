<script>
	import { Card, createGameBoardWithCards, GameOptions, updateGameState, gameState } from '$lib';
	import { goto } from '$app/navigation';

	function startGame() {
		createGameBoard();
		updateGameState({ gameInProgress: true });
		goto('/game-in-progress');
	}

	function createGameBoard() {
		updateGameState({
			gameBoard: createGameBoardWithCards($gameState.gridSize, $gameState.selectedTheme)
		});
		updateGameState({
			players: [...Array($gameState.numberOfPlayers)].fill(0).map((_, index) => {
				return { score: 0, name: 'Player ' + (index + 1), moves: 0 };
			})
		});
	}
</script>

<div class="grid grid-cols-12 gap-4 p-4">
	<div class="col-span-12 md:col-span-6 md:col-start-4">
		<Card>
			<GameOptions onStart={startGame} />
		</Card>
	</div>
</div>
