<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export let quote: string;
	export let author: string = '';
	export let type: 'quote' | 'reflection' | 'fade' = 'quote';
	
	let interludeElement: HTMLElement;
	let contentElement: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Fade in beim Erscheinen
		gsap.from(contentElement, {
			scrollTrigger: {
				trigger: interludeElement,
				start: 'top 80%',
				end: 'center center',
				scrub: true
			},
			opacity: 0,
			scale: 0.95,
			filter: 'blur(10px)'
		});

		// Fade out beim Verlassen
		gsap.to(contentElement, {
			scrollTrigger: {
				trigger: interludeElement,
				start: 'center center',
				end: 'bottom 20%',
				scrub: true
			},
			opacity: 0,
			scale: 0.95,
			filter: 'blur(10px)'
		});
	});
</script>

<section 
	class="interlude"
	class:interlude-quote={type === 'quote'}
	class:interlude-reflection={type === 'reflection'}
	class:interlude-fade={type === 'fade'}
	bind:this={interludeElement}
>
	<div class="interlude-content" bind:this={contentElement}>
		{#if type === 'quote'}
			<blockquote>
				<p class="quote-text">{quote}</p>
				{#if author}
					<cite>— {author}</cite>
				{/if}
			</blockquote>
		{:else if type === 'reflection'}
			<div class="reflection-text">
				<p>{quote}</p>
			</div>
		{:else if type === 'fade'}
			<div class="fade-text">
				<p>{quote}</p>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.interlude {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 4rem 2rem;
	}

	.interlude-quote {
		background: #000000;
	}

	.interlude-reflection {
		background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
	}

	.interlude-fade {
		background: #050505;
	}

	.interlude-content {
		max-width: 900px;
		width: 100%;
		text-align: center;
		will-change: transform, opacity;
	}

	blockquote {
		margin: 0;
		padding: 0;
		border: none;
	}

	.quote-text {
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 300;
		line-height: 1.3;
		color: rgba(255, 255, 255, 0.95);
		font-style: italic;
		margin: 0 0 2rem;
		text-shadow: 
			2px 2px 8px rgba(0, 0, 0, 0.9),
			0 0 40px rgba(255, 107, 107, 0.2);
	}

	cite {
		display: block;
		font-size: clamp(1.25rem, 2vw, 1.75rem);
		font-weight: 400;
		color: rgba(255, 255, 255, 0.6);
		font-style: normal;
		margin-top: 2rem;
	}

	.reflection-text {
		p {
			font-size: clamp(1.5rem, 3.5vw, 2.75rem);
			font-weight: 400;
			line-height: 1.5;
			color: rgba(255, 255, 255, 0.9);
			text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
			max-width: 800px;
			margin: 0 auto;
		}
	}

	.fade-text {
		p {
			font-size: clamp(1.25rem, 2.5vw, 2rem);
			font-weight: 500;
			line-height: 1.6;
			color: rgba(255, 255, 255, 0.7);
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
			letter-spacing: 0.05em;
			text-transform: uppercase;
		}
	}

	@media (max-width: 768px) {
		.interlude {
			min-height: 80vh;
			padding: 3rem 1.5rem;
		}

		.quote-text {
			font-size: clamp(1.5rem, 6vw, 2.5rem);
		}
	}
</style>
