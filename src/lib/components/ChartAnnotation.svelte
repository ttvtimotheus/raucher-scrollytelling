<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	export let text: string;
	export let x: number = 50;
	export let y: number = 50;
	export let delay: number = 0;
	export let arrow: 'up' | 'down' | 'left' | 'right' | 'none' = 'none';
	
	let annotationElement: HTMLElement;

	onMount(() => {
		// Fade in Animation
		gsap.from(annotationElement, {
			opacity: 0,
			y: arrow === 'up' ? 20 : arrow === 'down' ? -20 : 0,
			x: arrow === 'left' ? 20 : arrow === 'right' ? -20 : 0,
			scale: 0.9,
			filter: 'blur(5px)',
			duration: 1,
			delay: delay,
			ease: 'power2.out'
		});
	});
</script>

<div 
	class="chart-annotation" 
	class:arrow-up={arrow === 'up'}
	class:arrow-down={arrow === 'down'}
	class:arrow-left={arrow === 'left'}
	class:arrow-right={arrow === 'right'}
	bind:this={annotationElement}
	style="left: {x}%; top: {y}%;"
>
	<p>{text}</p>
	{#if arrow !== 'none'}
		<div class="arrow"></div>
	{/if}
</div>

<style lang="scss">
	.chart-annotation {
		position: absolute;
		background: rgba(255, 107, 107, 0.95);
		color: #ffffff;
		padding: 0.75rem 1.25rem;
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.4;
		max-width: 200px;
		pointer-events: none;
		box-shadow: 
			0 4px 12px rgba(255, 107, 107, 0.4),
			0 2px 4px rgba(0, 0, 0, 0.3);
		transform: translate(-50%, -50%);
		z-index: 10;
		
		p {
			margin: 0;
		}
	}

	.arrow {
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
	}

	.arrow-up .arrow {
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		border-width: 8px 8px 0 8px;
		border-color: rgba(255, 107, 107, 0.95) transparent transparent transparent;
	}

	.arrow-down .arrow {
		top: -8px;
		left: 50%;
		transform: translateX(-50%);
		border-width: 0 8px 8px 8px;
		border-color: transparent transparent rgba(255, 107, 107, 0.95) transparent;
	}

	.arrow-left .arrow {
		right: -8px;
		top: 50%;
		transform: translateY(-50%);
		border-width: 8px 0 8px 8px;
		border-color: transparent transparent transparent rgba(255, 107, 107, 0.95);
	}

	.arrow-right .arrow {
		left: -8px;
		top: 50%;
		transform: translateY(-50%);
		border-width: 8px 8px 8px 0;
		border-color: transparent rgba(255, 107, 107, 0.95) transparent transparent;
	}

	@media (max-width: 768px) {
		.chart-annotation {
			font-size: 0.75rem;
			padding: 0.5rem 1rem;
			max-width: 150px;
		}
	}
</style>
