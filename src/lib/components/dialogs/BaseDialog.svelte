<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onDestroy } from 'svelte';

	let { onClose = () => {}, allowEscapeClose = true, className = '', children } = $props();

	let dialog: HTMLDialogElement;

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (!allowEscapeClose) {
				event.preventDefault();
				return;
			}
			onClose();
		}
	}

	$effect(() => {
		dialog?.showModal();
	});

	onDestroy(() => {
		if (dialog?.open) {
			dialog.close();
		}
	});
</script>

<dialog
	bind:this={dialog}
	onkeydown={handleKeydown}
	class="border-none bg-transparent p-0 backdrop:bg-gray-800/50 backdrop:backdrop-blur-sm {className}"
	transition:fade={{ duration: 200 }}
>
	<div
		class="flex min-w-[300px] flex-col rounded-2xl bg-white shadow-lg md:min-w-[500px] lg:min-w-[600px] xl:min-w-[700px]"
		transition:scale={{ duration: 200, easing: quintOut }}
	>
		{@render children()}
	</div>
</dialog>

<style lang="postcss">
	dialog {
		position: fixed;
		margin: auto;
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
