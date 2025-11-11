<script lang="ts">
	import { onMount } from 'svelte';
	import { initScrollOrchestrator } from '$lib/gsap/scrollOrchestrator';
	import '$lib/styles/global.scss';

	let { children } = $props();

	onMount(() => {
		initScrollOrchestrator();
	});
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Wie du zum Raucher wurdest</title>
	<meta
		name="description"
		content="Eine interaktive Reise durch sieben Jahrzehnte Tabakwerbung und ihre Auswirkungen."
	/>
</svelte:head>

{@render children()}
