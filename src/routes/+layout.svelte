<script lang="ts">
	import '../app.css';
	import { gameState, updateGameState } from '$lib/stores/game-state-store';
	import { Button, gameEvents } from '$lib';
	import { goto } from '$app/navigation';

	let { children } = $props();

	function restartGame() {
		gameEvents.restart();
	}

	function selectNewGame() {
		updateGameState({ gameInProgress: false, players: [], currentPlayerIndex: 0 });
		goto('/');
	}
</script>

<div class="flex h-screen flex-col" class:bg-gray-800={!$gameState.gameInProgress}>
	<header class="px-6 pt-4 md:pb-0 pb-4 text-white">
		{#if $gameState.gameInProgress}
			<div class="flex w-full items-center">
				<h1 class="ml-6 text-3xl font-bold text-gray-800 md:w-6/12 md:text-4xl lg:w-9/12">
					memory
				</h1>
				<div class="hidden gap-2 md:flex">
					<Button primary={true} onclick={restartGame}>Restart</Button>
					<Button onclick={selectNewGame}>New Game</Button>
				</div>
				<div class="flex gap-2 md:hidden">
					<Button>Menu</Button>
				</div>
			</div>
		{:else}
			<h1 class="m-6 text-center text-3xl font-bold md:text-4xl">memory</h1>
		{/if}
	</header>
	<main class="flex-1 overflow-y-auto p-4 md:p-6">{@render children()}</main>
</div>
