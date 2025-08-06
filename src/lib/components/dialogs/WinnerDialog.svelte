<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { gameEvents } from '$lib/stores/game-events-store';
	import { Button } from '$lib/index';

	export let result: GameResult;

	let dialog: HTMLDialogElement;

	$: formattedTime = formatTime(result.time);

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	}

	function handleRestart() {
		dialog?.close();
		gameEvents.restart();
	}

	$: if (dialog && !dialog.open) {
		dialog.showModal();
	}
</script>

<dialog
	bind:this={dialog}
	class="backdrop:bg-gray-800/50 backdrop:backdrop-blur-sm"
	transition:fade={{ duration: 200 }}
>
	<div
		class="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg min-w-[90vw] md:min-w-2xl"
		transition:scale={{ duration: 200, easing: quintOut }}
	>
		{#if result.winningPlayer.name}
			<h2 class="text-center text-2xl font-bold text-gray-700">{result.winningPlayer.name} Wins</h2>
		{/if}

		<div class="flex flex-col gap-4">
			<p class="text-center font-semibold text-gray-500">Game over here are the results.</p>

			<div class="flex flex-col gap-4">
				{#each result.players as player (player.name)}
					<div class={`
        flex flex-row rounded-lg w-full bg-gray-100 p-4 justify-between
        ${player.name === result.winningPlayer.name ? 'bg-gray-800 text-white' : 'text-gray-700'
        }
    `}>

						<div
							class="text-lg md:text-2xl">{player.name} {player.name === result.winningPlayer.name ? '(Winner) 🏆' : ''}</div>
						<div class=" text-xl md:text-3xl font-bold">{player.score} pairs</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col justify-evenly gap-4 md:flex-row">
			<Button className="w-full" onclick={() => handleRestart()} primary={true}>Restart</Button>
			<Button className="w-full h-full" onclick={() => dialog?.close()}>Setup New Game</Button>
		</div>
	</div>
</dialog>

<style lang="postcss">
    dialog {
        position: fixed;
        border: none;
        padding: 0;
        margin: auto;
        background: transparent;
    }

    dialog::backdrop {
        position: fixed;
        inset: 0;
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
