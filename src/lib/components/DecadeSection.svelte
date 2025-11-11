<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { birthYear } from '$lib/stores/birthYear';
	import { getBirthYearHint } from '$lib/stores/birthYear';
	import type { DecadeSection } from '$lib/data/decades';

	export let section: DecadeSection;
	export let chartComponent: any = null;
	export let layout: 'left' | 'right' | 'full' | 'stacked' = 'left';
	export let colorTheme: '1950' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020' = '1950';

	let sectionElement: HTMLElement;
	let isVisible = true;

	$: hint = getBirthYearHint($birthYear, parseInt(section.decade.split('er')[0]));

	onMount(() => {
		// Sections sind sofort sichtbar für Pinning
		isVisible = true;
	});
</script>

<section
	id={section.id}
	class="decade-section"
	class:visible={isVisible}
	class:layout-left={layout === 'left'}
	class:layout-right={layout === 'right'}
	class:layout-full={layout === 'full'}
	class:layout-stacked={layout === 'stacked'}
	class:theme-1950={colorTheme === '1950'}
	class:theme-1970={colorTheme === '1970'}
	class:theme-1980={colorTheme === '1980'}
	class:theme-1990={colorTheme === '1990'}
	class:theme-2000={colorTheme === '2000'}
	class:theme-2010={colorTheme === '2010'}
	class:theme-2020={colorTheme === '2020'}
	data-decade={colorTheme}
	bind:this={sectionElement}
>
	<div class="section-grid">
		<div class="narrative-column">
			<div class="sticky-content">
				<span class="decade-label">{section.decade}</span>
				<h2>{section.title}</h2>
				<h3>{section.subtitle}</h3>

				<div class="narrative-text">
					{#each section.narrative as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>

				{#if hint}
					<div class="birth-year-hint" role="note">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<circle cx="12" cy="12" r="10" stroke-width="2" />
							<path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round" />
						</svg>
						<p>{hint}</p>
					</div>
				{/if}
			</div>
		</div>

		<div class="media-column">
			{#if chartComponent}
				<div class="chart-container">
					<p class="chart-explainer">{section.chartExplainer}</p>
					<div class="chart-wrapper">
						<svelte:component this={chartComponent} {section} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.decade-section {
		min-height: 100vh;
		position: relative;
		background: #0a0a0a;
		padding: 0;
		will-change: transform;

		&.visible {
			opacity: 1;
		}
	}

	// Alternierende Hintergrundfarben
	.decade-section:nth-child(odd) {
		background: #0f0f0f;
	}

	.decade-section:nth-child(even) {
		background: #050505;
	}

	.section-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
		min-height: 100vh;
		align-items: center;

		@media (max-width: 1024px) {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	// Layout Varianten
	.layout-right .section-grid {
		grid-template-columns: 1.2fr 1fr;
		.narrative-column {
			order: 2;
		}
		.media-column {
			order: 1;
		}
	}

	.layout-full .section-grid {
		grid-template-columns: 1fr;
		max-width: 1600px;
		gap: 3rem;
	}

	.layout-stacked .section-grid {
		grid-template-columns: 1fr;
		max-width: 900px;
		gap: 2rem;
		
		.sticky-content {
			max-width: 700px;
			margin: 0 auto;
			text-align: center;
		}
		
		.chart-container {
			margin: 0 auto;
		}
	}

	.layout-full .narrative-column {
		max-width: 600px;
	}

	.narrative-column {
		position: relative;
	}

	.sticky-content {
		padding: 2rem;
		background: rgba(26, 26, 26, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid #2a2a2a;
	}

	.decade-label {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #ff6b6b;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: clamp(1.25rem, 2vw, 1.5rem);
		color: #a0a0a0;
		font-weight: 400;
		margin-bottom: 2rem;
	}

	.narrative-text {
		p {
			font-size: 1.125rem;
			line-height: 1.75;
			margin-bottom: 1.5rem;
			color: #d0d0d0;
		}
	}

	.birth-year-hint {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-top: 2rem;
		padding: 1rem;
		background: rgba(255, 107, 107, 0.1);
		border-left: 3px solid #ff6b6b;
		border-radius: 4px;

		svg {
			flex-shrink: 0;
			color: #ff6b6b;
			margin-top: 0.25rem;
		}

		p {
			font-size: 1rem;
			color: #ff8787;
			margin: 0;
		}
	}

	.media-column {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chart-container {
		width: 100%;
	}

	.chart-explainer {
		font-size: 1.125rem;
		line-height: 1.75;
		color: #d0d0d0;
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: rgba(26, 26, 26, 0.6);
		border-radius: 8px;
		border-left: 4px solid #ff6b6b;
	}

	.chart-wrapper {
		min-height: 400px;
		background: #1a1a1a;
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid #2a2a2a;
	}

	@media (prefers-reduced-motion: reduce) {
		.decade-section {
			opacity: 1;
		}
	}

	@media (max-width: 1024px) {
		.decade-section {
			min-height: auto;
		}
		
		.section-grid {
			padding: 1rem;
			min-height: auto;
		}
	}
</style>
