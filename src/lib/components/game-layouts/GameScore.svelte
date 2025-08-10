<script lang="ts">
	import { onDestroy } from 'svelte';
	import { formattedTime, gameTimer } from '$lib/stores/timer-store';

	let { moves = 0 } = $props<{ moves: number }>();

	gameTimer.start();

	onDestroy(() => {
		gameTimer.stop();
	});
</script>

<div class="mt-4 flex w-full flex-row gap-4 p-4 text-gray-700 md:items-center md:justify-center">
	<div class="flex w-1/2 flex-col items-center gap-2 rounded bg-gray-200 p-6 md:w-2xs">
		<div class="text-lg font-semibold">Time</div>
		<div class="px-3 py-1 font-mono text-2xl font-bold md:text-4xl">
			{$formattedTime}
		</div>
	</div>

	<div class="flex w-1/2 flex-col items-center gap-2 rounded bg-gray-200 p-6 md:w-2xs">
		<div class="text-lg font-semibold">Moves</div>
		<div class=" px-3 py-1 font-mono text-2xl font-bold md:text-4xl">
			{moves}
		</div>
	</div>
</div>
