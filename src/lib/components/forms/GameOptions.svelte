<script lang="ts">
	import { Button, gameState, SelectionButton } from '$lib';
	import { updateGameState } from '$lib/stores/game-state-store';

	let { onStart = () => {} } = $props();

	const themeOptions = [
		{ value: 'numbers', label: 'Numbers', icon: '🔢' },
		{ value: 'icons', label: 'Icons', icon: '🎨' }
	];

	const playerOptions = [1, 2, 3, 4];

	const gridOptions = [4, 6];

	const changeTheme = (theme: string) => {
		updateGameState({ selectedTheme: theme });
	};

	function updateNumberOfPlayers(players: number) {
		updateGameState({ numberOfPlayers: players });
	}

	function updateGridSize(size: number) {
		updateGameState({ gridSize: size });
	}
</script>

<h2 class="text-1xl mb-4 font-semibold text-gray-400">Select Theme</h2>
<div class="grid grid-cols-12 gap-4">
	{#each themeOptions as option (option.value)}
		<div class="col-span-6">
			<SelectionButton
				className="w-full"
				selected={$gameState.selectedTheme === option.value}
				onclick={() => changeTheme(option.value)}
			>
				{option.label}
			</SelectionButton>
		</div>
	{/each}
</div>

<h2 class="text-1xl my-4 font-semibold text-gray-400">Number of Players</h2>
<div class="grid grid-cols-12 gap-4">
	{#each playerOptions as option (option)}
		<div class="col-span-3">
			<SelectionButton
				className="w-full"
				selected={$gameState.numberOfPlayers === option}
				onclick={() => updateNumberOfPlayers(option)}
			>
				{option}
			</SelectionButton>
		</div>
	{/each}
</div>

<h2 class="text-1xl my-4 font-semibold text-gray-400">Grid Size</h2>
<div class="grid grid-cols-12 gap-4">
	{#each gridOptions as option (option)}
		<div class="col-span-6">
			<SelectionButton
				className="w-full"
				selected={$gameState.gridSize === option}
				onclick={() => updateGridSize(option)}
			>
				{option} x {option}
			</SelectionButton>
		</div>
	{/each}
</div>

<Button primary={true} onclick={onStart} className="w-full mt-8">Start Game</Button>
