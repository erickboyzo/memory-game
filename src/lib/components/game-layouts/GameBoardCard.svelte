<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import { onDestroy } from 'svelte';

	let {
		className = '',
		card,
		theme,
		gridSize,
		disableClick = false,
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

	function handleInteraction(event?: KeyboardEvent) {
		if (disableClick) return;
		if (event?.type === 'keydown' && event.key !== 'Enter') return;

		onCardClick(card);
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

<div
	class="aspect-square w-full {gridSize === 4
		? 'max-w-[4.5rem] min-w-[3.5rem] sm:max-w-[5.5rem] md:max-w-[6.5rem] lg:max-w-[7.5rem] xl:max-w-[8rem]'
		: 'max-w-[3.5rem] min-w-[2.5rem] sm:max-w-[4rem] md:max-w-[4.5rem] lg:max-w-[5rem] xl:max-w-[5.5rem]'}
           {disableClick || card.isMatched || card.isFlipped ? 'pointer-events-none' : ''}"
>
	<div
		role="button"
		tabindex="0"
		aria-label="Memory card"
		class="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] {card.isFlipped
			? '[transform:rotateY(180deg)]'
			: ''}"
		onkeydown={handleInteraction}
		onclick={onCardClick}
	>
		<!-- Back of card -->
		<div
			class="absolute inset-0 flex cursor-pointer items-center justify-center
                   rounded-full border border-gray-300 bg-gray-800 p-1.5
                   shadow-md [backface-visibility:hidden]
                   sm:p-2 md:p-2.5 lg:p-3"
		></div>

		<!-- Front of card -->
		<div
			class="absolute inset-0 flex [transform:rotateY(180deg)] items-center
                   justify-center rounded-full border p-1.5 text-white
                   shadow-md [backface-visibility:hidden]
                   sm:p-2 md:p-2.5 lg:p-3 {className}
                   {showMatchedBackground
				? 'border-amber-400 bg-amber-500'
				: 'border-gray-300 bg-gray-400'}
                   transition-colors duration-300"
		>
			{#if theme === 'numbers'}
				<span
					class="text-base font-bold
                           sm:text-xl md:text-2xl lg:text-3xl
                           xl:text-4xl">{card.value}</span
				>
			{/if}
			{#if theme === 'icons'}
				<i
					class="fas {card.value} text-3xl md:text-4xl lg:text-5xl
                          xl:text-6xl"
				></i>
			{/if}
		</div>
	</div>
</div>
