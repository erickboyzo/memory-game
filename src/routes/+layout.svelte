<script lang="ts">
	import '../app.css';
	import { gameInProgress } from '$lib/stores';

	let { children } = $props();
</script>

<div class="flex h-screen flex-col" class:bg-gray-800={!$gameInProgress}>
	<header class="p-4 text-white">
		{#if $gameInProgress}
			<h1 class="m-6 text-4xl font-bold">memory</h1>
		{:else}
			<h1 class="m-6 text-center text-4xl font-bold">memory</h1>
		{/if}
	</header>
	<main class="flex-1 overflow-y-auto p-4">{@render children()}</main>
</div>
