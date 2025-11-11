<script lang="ts">
	import { onMount } from 'svelte';
	import HeroCowboy from '$lib/components/HeroCowboy.svelte';
	import BirthYearControl from '$lib/components/BirthYearControl.svelte';
	import DecadeSection from '$lib/components/DecadeSection.svelte';
	import ChartWrapper from '$lib/components/ChartWrapper.svelte';
	import { decades } from '$lib/data/decades';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<main class="scrollytelling-container">
	<HeroCowboy />

	<section id="birth-year-section">
		<BirthYearControl />
	</section>

	{#if mounted}
		{#each decades as section, i}
			<DecadeSection 
				{section} 
				chartComponent={ChartWrapper}
				layout={i % 2 === 0 ? 'left' : 'right'}
			/>
		{/each}
	{/if}

	<section class="finale-section">
		<div class="container-narrow">
			<h2>Es war nie deine Entscheidung allein.</h2>
			<p class="emphasis">Aber du kannst sie dir zurückholen.</p>

			<div class="cta-buttons">
				<a href="/" class="button-secondary">Nochmal ansehen</a>
				<a
					href="https://www.rauchfrei-info.de"
					target="_blank"
					rel="noopener noreferrer"
					class="button-primary"
				>
					Frei atmen
				</a>
			</div>

			<div class="data-link">
				<a href="/daten">Daten und Methodik</a>
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	.scrollytelling-container {
		background: #0a0a0a;
		color: #f5f5f5;
	}

	.finale-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 2rem;
		background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2a 100%);
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		margin-bottom: 2rem;
		line-height: 1.2;
	}

	.emphasis {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		color: #ff8787;
		font-weight: 600;
		margin-bottom: 4rem;
	}

	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 3rem;
	}

	.button-primary,
	.button-secondary {
		display: inline-block;
		padding: 1.25rem 3rem;
		font-size: 1.125rem;
		font-weight: 600;
		border-radius: 50px;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.button-primary {
		background: #ff6b6b;
		color: #fff;

		&:hover {
			background: #ff5252;
			transform: translateY(-2px);
			box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
		}
	}

	.button-secondary {
		background: transparent;
		color: #f5f5f5;
		border: 2px solid #3a3a3a;

		&:hover {
			border-color: #ff6b6b;
			color: #ff6b6b;
		}
	}

	.data-link {
		margin-top: 2rem;

		a {
			color: #a0a0a0;
			text-decoration: underline;
			font-size: 1rem;

			&:hover {
				color: #f5f5f5;
			}
		}
	}

	@media (max-width: 640px) {
		.cta-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.button-primary,
		.button-secondary {
			width: 100%;
		}
	}
</style>
