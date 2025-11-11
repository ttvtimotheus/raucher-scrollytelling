<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let title: string = '';
	export let body: string;
	export let highlight: string = '';
	
	let bridgeElement: HTMLElement;
	let contentElement: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Pin die Bridge Section für Reflexionszeit
		ScrollTrigger.create({
			trigger: bridgeElement,
			start: 'top top',
			end: '+=150%',
			pin: true,
			pinSpacing: true
		});

		// Fade in beim Erscheinen
		gsap.from(contentElement, {
			scrollTrigger: {
				trigger: bridgeElement,
				start: 'top 70%',
				end: 'top 30%',
				scrub: 1
			},
			opacity: 0,
			y: 40
		});
	});
</script>

<section class="narrative-bridge" bind:this={bridgeElement}>
	<div class="bridge-content" bind:this={contentElement}>
		{#if title}
			<h3 class="bridge-title">{title}</h3>
		{/if}
		
		<div class="bridge-body">
			{@html body}
		</div>
		
		{#if highlight}
			<p class="bridge-highlight">{highlight}</p>
		{/if}
	</div>
</section>

<style lang="scss">
	.narrative-bridge {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0a0a0a;
		padding: 4rem 2rem;
		position: relative;
	}

	.bridge-content {
		max-width: 800px;
		width: 100%;
	}

	.bridge-title {
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		font-weight: 700;
		color: #ff6b6b;
		margin: 0 0 2rem;
		line-height: 1.2;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.bridge-body {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 400;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 2rem;

		:global(p) {
			margin: 0 0 1.5rem;
		}

		:global(strong) {
			color: #ffffff;
			font-weight: 600;
		}

		:global(em) {
			font-style: italic;
			color: rgba(255, 255, 255, 0.8);
		}
	}

	.bridge-highlight {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 600;
		color: #ff8787;
		font-style: italic;
		margin: 3rem 0 0;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 107, 107, 0.3);
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.narrative-bridge {
			padding: 3rem 1.5rem;
		}

		.bridge-content {
			max-width: 100%;
		}
	}
</style>
