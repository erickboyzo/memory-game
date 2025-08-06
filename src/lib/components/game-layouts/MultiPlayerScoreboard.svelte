<script lang="ts">
	let { players = [], currentPlayerId = 1 } = $props<{
		players: Player[];
		currentPlayerId: number;
	}>();
</script>

<div class="w-full p-4">
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each players as player, index (player.name)}
			<div
				class="relative flex flex-col rounded-lg p-6 transition-all duration-300
                {currentPlayerId === index
					? 'bg-amber-500 text-white'
					: 'bg-gray-200 text-gray-400'}"
			>
				<!-- Active Player Indicator Arrow -->
				{#if currentPlayerId === index}
					<div class="absolute -top-2 left-1/2 -translate-x-1/2">
						<div
							class="h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-amber-500"
						></div>
					</div>
				{/if}

				<div class="flex w-full items-center justify-between gap-2">
					<span class="text-lg font-semibold">
						{player.name}
					</span>
					<span class="font-mono text-xl font-bold">{player.score}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.relative:hover {
		transform: translateY(-2px);
	}
</style>
