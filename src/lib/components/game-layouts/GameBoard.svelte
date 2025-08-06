<script lang="ts">
	import { gameState, updateGameState } from '$lib';
	import GameBoardCard from '$lib/components/game-layouts/GameBoardCard.svelte';

	let { gameBoard = $bindable(), updateMoves = () => {}, updateScore = () => {} } = $props();
	let flippedCards: GameCard[] = [];

	function handleCardClick(card: GameCard, rowIndex: number, colIndex: number) {
		console.log('Card clicked:', card, rowIndex, colIndex);
		card.isFlipped = true;

		if (flippedCards.length === 0) {
			flippedCards.push(card);
		} else {
			if (flippedCards[0].value === card.value) {
				card.isMatched = true;
				flippedCards[0].isMatched = true;
				flippedCards = [];
				updateScore();
				updateGameState({ gameBoard: gameBoard });
			} else {
				setTimeout(() => {
					updateMoves();
					flippedCards[0].isFlipped = false;
					card.isFlipped = false;
					flippedCards = [];
				}, 1000);
			}
		}
	}
</script>

{#if gameBoard}
	<div class="space-y-2 px-4">
		{#each gameBoard as row, rowIndex (row)}
			<div class="flex justify-center gap-2">
				{#each row as card, colIndex (card.id)}
					<GameBoardCard
						{card}
						theme={$gameState.selectedTheme}
						onCardClick={() => handleCardClick(card, rowIndex, colIndex)}
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
