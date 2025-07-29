<script lang="ts">
	import { selectedTheme, numberOfPlayers, gridSize, SelectionButton, Button, gameInProgress } from '$lib';
	import { goto } from '$app/navigation';

	const themeOptions = [
		{ value: 'numbers', label: 'Numbers', icon: '🔢' },
		{ value: 'icons', label: 'Icons', icon: '🎨' }
	];

	const playerOptions = [1, 2, 3, 4];

	const gridOptions = [4, 6];

	const isPrimary = true;

	const changeTheme = (theme: string) => {
		selectedTheme.set(theme);
	};

	function startGame() {
		gameInProgress.set(true);
		goto('/game-in-progress');
	}
</script>

<h2 class="text-1xl mb-4 font-semibold text-gray-400">Select Theme</h2>
<div class="grid grid-cols-12 gap-4">
	{#each themeOptions as option}
		<div class="col-span-6">
			<SelectionButton
				className="w-full"
				selected={$selectedTheme === option.value}
				onclick={() => changeTheme(option.value)}
			>
				{option.label}
			</SelectionButton>
		</div>
	{/each}
</div>

<h2 class="text-1xl my-4 font-semibold text-gray-400">Number of Players</h2>
<div class="grid grid-cols-12 gap-4">
	{#each playerOptions as option}
		<div class="col-span-3">
			<SelectionButton
				className="w-full"
				selected={$numberOfPlayers === option}
				onclick={() => numberOfPlayers.set(option)}
			>
				{option}
			</SelectionButton>
		</div>
	{/each}
</div>

<h2 class="text-1xl my-4 font-semibold text-gray-400">Grid Size</h2>
<div class="grid grid-cols-12 gap-4">
	{#each gridOptions as option}
		<div class="col-span-6">
			<SelectionButton
				className="w-full"
				selected={$gridSize === option}
				onclick={() => gridSize.set(option)}
			>
				{option} x {option}
			</SelectionButton>
		</div>
	{/each}
</div>

<Button primary={isPrimary} onclick={startGame} className="w-full mt-8">Start Game</Button>
