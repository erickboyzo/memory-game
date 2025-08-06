<script lang="ts">
	let {
		children,
		primary = false,
		disabled = false,
		inverted = false,
		onclick = () => {},
		className = ''
	} = $props();

	let invertedClass = 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-600';
</script>

<button
	class="h-12 cursor-pointer rounded-4xl px-4 py-2 text-xl font-semibold transition-all duration-200 {className} {primary
		? 'bg-amber-500 text-white hover:bg-amber-400'
		: inverted ? invertedClass : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-600'}"
	{disabled}
	{onclick}
>
	{@render children()}
</button>
