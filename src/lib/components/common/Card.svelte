<script lang="ts">
	let { children, title = '', className = '' } = $props();
</script>

<div
	class="rounded-3xl border border-gray-300 bg-white p-6 shadow-md transition-shadow duration-200 ease-in-out hover:shadow-xl {className}"
>
	{#if title}
		<h2 class="mb-4 text-xl font-semibold">{title}</h2>
	{/if}
	{@render children()}
</div>
