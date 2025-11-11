<script lang="ts">
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';
	import VideoLooper from './VideoLooper.svelte';

	let lottieContainer: HTMLDivElement;
	let animationInstance: any;

	onMount(() => {
		if (lottieContainer) {
			try {
				animationInstance = lottie.loadAnimation({
					container: lottieContainer,
					renderer: 'svg',
					loop: false,
					autoplay: true,
					path: '/lottie/title_morph.json'
				});
			} catch (e) {
				console.error('Lottie load failed:', e);
			}
		}

		return () => {
			if (animationInstance) {
				animationInstance.destroy();
			}
		};
	});

	function scrollToNext() {
		const nextSection = document.querySelector('#birth-year-section');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section id="hero-cowboy" class="hero-cowboy">
	<div class="video-background">
		<VideoLooper videoSlug="cowboy_loop" />
	</div>

	<div class="hero-content">
		<div class="lottie-title" bind:this={lottieContainer}></div>
		
		<div class="text-overlay">
			<p class="line">Er war stark. Frei. Unabhängig.</p>
			<p class="line">Und er war nie echt.</p>
			<p class="line emphasis">
				Bevor du deine erste Zigarette gesehen hast, hatte jemand längst entschieden, wie du über
				sie denken wirst.
			</p>
		</div>

		<button class="cta-scroll" on:click={scrollToNext} aria-label="Scroll to next section">
			<span>Scrolle weiter</span>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M12 5v14M19 12l-7 7-7-7" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</section>

<style lang="scss">
	.hero-cowboy {
		position: relative;
		height: 100vh;
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.video-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
		}
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem;
		max-width: 900px;
	}

	.lottie-title {
		width: 100%;
		max-width: 600px;
		height: 200px;
		margin: 0 auto 3rem;
	}

	.text-overlay {
		margin-bottom: 4rem;
	}

	.line {
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		line-height: 1.6;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);

		&.emphasis {
			font-size: clamp(1.5rem, 3.5vw, 2rem);
			font-weight: 600;
			color: #ff8787;
			margin-top: 2rem;
		}
	}

	.cta-scroll {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: rgba(255, 107, 107, 0.9);
		color: #fff;
		border: none;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		animation: pulse 2s infinite;

		&:hover {
			background: #ff6b6b;
			transform: translateY(4px);
		}

		svg {
			animation: bounce 2s infinite;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
		}
		50% {
			box-shadow: 0 0 0 20px rgba(255, 107, 107, 0);
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cta-scroll {
			animation: none;

			svg {
				animation: none;
			}
		}
	}

	@media (max-width: 640px) {
		.lottie-title {
			height: 150px;
			margin-bottom: 2rem;
		}

		.line {
			font-size: 1.125rem;

			&.emphasis {
				font-size: 1.375rem;
			}
		}
	}
</style>
