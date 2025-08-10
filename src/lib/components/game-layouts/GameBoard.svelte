<script lang="ts">
	import { gameState, updateGameState } from '$lib';
	import GameBoardCard from '$lib/components/game-layouts/GameBoardCard.svelte';
	import { Tween } from 'svelte/motion';

	let {
		gameBoard = $bindable(),
		updateMoves = $bindable(() => {}),
		updateScore = $bindable(() => {})
	} = $props();
	let flippedCards = $state<GameCard[]>([]);
	let disableClick = $state(false);

	const flipAnimation = new Tween(0, {
		duration: 1000
	});

	function handleCardClick(card: GameCard) {
		if (card.isFlipped || card.isMatched) {
			return;
		}

		card.isFlipped = true;

		if (flippedCards.length === 0) {
			flippedCards.push(card);
		} else {
			disableClick = true;
			if (flippedCards[0].value === card.value) {
				handleMatches(card);
			} else {
				resetCards(card);
			}
		}
	}

	function handleMatches(card: GameCard) {
		card.isMatched = true;
		flippedCards[0].isMatched = true;
		flippedCards = [];
		updateScore();
		updateGameState({ gameBoard: gameBoard });
		disableClick = false;
	}

	function resetCards(card: GameCard) {
		flipAnimation.set(1).then(() => {
			updateMoves();
			flippedCards[0].isFlipped = false;
			card.isFlipped = false;
			flippedCards = [];
			disableClick = false;
		});
	}
</script>

{#if gameBoard && gameBoard.length > 0}
	<div class="space-y-2 px-4">
		{#each gameBoard as row, rowIndex (rowIndex)}
			<div class="flex justify-center gap-2">
				{#each row as card, colIndex (`${rowIndex}-${colIndex}`)}
					<GameBoardCard
						{card}
						{disableClick}
						theme={$gameState.selectedTheme}
						gridSize={$gameState.gridSize}
						onCardClick={() => handleCardClick(card)}
					/>
				{/each}
			</div>
		{/each}
	</div>
{:else}
	<div class="flex items-center justify-center p-8">
		<p class="text-gray-500">Loading game...</p>
	</div>
{/if}
