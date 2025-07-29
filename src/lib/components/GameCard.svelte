<script lang="ts">
	let { children, title = '', className = '' } = $props();
</script>

<div class="card rounded-3xl bg-white p-6 shadow-md {className}">
	{#if title}
		<h2 class="mb-4 text-xl font-semibold">{title}</h2>
	{/if}
	{@render children()}
</div>

<style>
	.card {
		border: 1px solid #e5e7eb;
		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}
</style>
