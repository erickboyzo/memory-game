<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { onDestroy } from 'svelte';

	let {
		className = '',
		card,
		theme,
		onCardClick = (() => {}) as MouseEventHandler<HTMLDivElement>
	} = $props();

	let showMatchedBackground = $state(false);
	let timeoutId: number;

	function handleMatch() {
		if (card.isMatched) {
			showMatchedBackground = true;

			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				showMatchedBackground = false;
			}, 1000);
		}
	}

	$effect(() => {
		const isMatched = card.isMatched;
		if (isMatched) {
			handleMatch();
		}
	});

	onDestroy(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
	});
</script>

<div class="aspect-square h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-29 lg:w-29">
	<div
		role="button"
		tabindex="0"
		aria-label="Memory card"
		class="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] {card.isFlipped
			? '[transform:rotateY(180deg)]'
			: ''}"
		onclick={onCardClick}
	>
		<!-- Back of card -->
		<div
			class="absolute inset-0 flex items-center justify-center rounded-full border border-gray-300 bg-gray-800 p-4 shadow-md [backface-visibility:hidden]"
		></div>

		<!-- Front of card -->
		<div
			class="absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-full border p-4 text-white shadow-md [backface-visibility:hidden] {className}
{showMatchedBackground
				? 'border-amber-400 bg-amber-500'
				: 'border-gray-300 bg-gray-400'}  transition-colors duration-300"
		>
			{#if theme === 'numbers'}
				<span class="text-3xl font-bold md:text-5xl">{card.value}</span>
			{/if}
			{#if theme === 'icons'}
				<i class="fas {card.value} text-3xl md:text-5xl"></i>
			{/if}
		</div>
	</div>
</div>
