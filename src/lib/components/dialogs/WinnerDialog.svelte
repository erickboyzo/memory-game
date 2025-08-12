<script lang="ts">
	import { BaseDialog, Button } from '$lib';

	export let result: GameResult;
	export let onResetGame = () => {};
	export let onNewGame = () => {};

	$: formattedTime = formatTime(result.time);

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	}

	function handleRestart() {
		onResetGame();
	}

	function selectNewGame() {
		onNewGame();
	}
</script>

<BaseDialog allowEscapeClose={false}>
	<div class="flex flex-col gap-1 p-8">
		{#if result.multiPlayer}
			{#if result?.winningPlayer?.name}
				<h2 class="text-center text-4xl font-bold text-gray-700">
					{result.winningPlayer.name} Wins
				</h2>
			{:else}
				<h2 class="text-center text-4xl font-bold text-gray-700">It's a tie</h2>
			{/if}

			<div class="my-5 flex flex-col gap-4">
				<p class="text-center text-lg font-semibold text-gray-600">
					Game over here are the results.
				</p>

				<div class="flex flex-col gap-4">
					{#each result.players as player (player.name)}
						<div
							class={`
        flex w-full flex-row justify-between rounded-lg bg-gray-200 p-4
        ${player.name === result?.winningPlayer?.name ? 'bg-gray-800 text-white' : 'text-gray-700'}
    `}
						>
							<div class="text-lg md:text-2xl">
								{player.name}
								{player.name === result?.winningPlayer?.name ? '(Winner) 🏆' : ''}
							</div>
							<div class=" text-xl font-bold md:text-3xl">{player.score} pairs</div>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<h2 class="text-center text-4xl font-bold text-gray-700">You did it!</h2>
			<div class="flex flex-col gap-4">
				<p class="text-center text-lg font-semibold text-gray-600">Game over here's how you did.</p>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex w-full flex-row justify-between rounded-lg bg-gray-200 p-4">
					<div class="text-lg text-gray-600 md:text-2xl">Time Elapsed</div>
					<div class=" text-xl font-bold text-gray-700 md:text-3xl">{formattedTime}</div>
				</div>
				<div class="flex w-full flex-row justify-between rounded-lg bg-gray-200 p-4">
					<div class="text-lg text-gray-600 md:text-2xl">Moves Taken</div>
					<div class="text-xl font-bold text-gray-700 md:text-3xl">
						{result.winningPlayer.moves} Moves
					</div>
				</div>
			</div>
		{/if}

		<div class="my-5 flex flex-col justify-evenly gap-4 md:flex-row">
			<Button className="w-full" onclick={handleRestart} primary={true}>Restart</Button>
			<Button className="w-full h-full" inverted={true} onclick={selectNewGame}
				>Setup New Game</Button
			>
		</div>
	</div>
</BaseDialog>
