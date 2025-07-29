<script lang="ts">
	let {
		children,
		selected = false,
		disabled = false,
		onclick = () => {},
		className = ''
	} = $props();
</script>

<button
	class="rounded-4xl border-2 px-4 py-2 text-lg font-semibold transition-all duration-200 {className} {selected
		? 'cursor-pointer border-gray-500 bg-gray-800 text-white hover:bg-gray-800'
		: disabled
			? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
			: 'cursor-pointer border-gray-300 bg-gray-400 text-white hover:border-gray-500 hover:bg-gray-500'}"
	{disabled}
	{onclick}
>
	{@render children()}
</button>
