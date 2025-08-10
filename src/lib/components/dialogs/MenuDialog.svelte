<script lang="ts">
	import { BaseDialog, Button } from '$lib';

	let { close = () => {}, onRestart = () => {}, onNewGame = () => {} } = $props();
</script>

<BaseDialog onClose={close}>
	<div class="w-full">
		<!-- Header with close button -->
		<div class="flex justify-end p-2">
			<button
				class="text-gray-500 transition-colors hover:text-gray-700"
				onclick={close}
				aria-label="Close dialog"
			>
				<i class="fas fa-times p-2 text-2xl"></i>
			</button>
		</div>

		<!-- Dialog content -->
		<div class="px-6 pb-6 text-center">
			<h2 class="mb-4 text-2xl font-bold text-gray-700">Game Paused</h2>

			<div class="my-5 flex flex-col justify-evenly gap-4 md:flex-row">
				<Button className="w-full" onclick={onRestart} primary={true}>Restart</Button>
				<Button className="w-full h-full" inverted={true} onclick={onNewGame}>Setup New Game</Button
				>
			</div>
		</div>
	</div>
</BaseDialog>
