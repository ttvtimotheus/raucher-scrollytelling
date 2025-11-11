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
		<VideoLooper 
			videoSlug="smoking_commercial_website_intro" 
			poster="/video/smoking_commercial_website_intro_poster.jpg" 
		/>
		<a 
			href="https://www.industrydocuments.ucsf.edu/docs/ljwl0154/" 
			target="_blank" 
			rel="noopener noreferrer"
			class="video-source"
			aria-label="Video source: UCSF Industry Documents Library"
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="16" x2="12" y2="12"></line>
				<line x1="12" y1="8" x2="12.01" y2="8"></line>
			</svg>
			<span>Quelle: UCSF (1955–1970) • 08:00–09:00</span>
		</a>
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #000;
		overflow: hidden;
		padding: 2rem;
	}

	.video-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 1;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.1) 0%,
				rgba(0, 0, 0, 0.5) 70%,
				rgba(0, 0, 0, 0.8) 100%
			);
			pointer-events: none;
			z-index: 1;
		}
	}

	.video-source {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		z-index: 2;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.875rem;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.75rem;
		text-decoration: none;
		transition: all 0.3s ease;

		&:hover {
			background: rgba(0, 0, 0, 0.75);
			color: rgba(255, 255, 255, 1);
			border-color: rgba(255, 255, 255, 0.2);
			transform: translateY(-2px);
		}

		svg {
			flex-shrink: 0;
			opacity: 0.8;
		}

		span {
			font-weight: 500;
			letter-spacing: 0.01em;
		}
	}

	.hero-content {
		position: relative;
		z-index: 3;
		text-align: center;
		max-width: 1200px;
		width: 100%;
		animation: fadeInUp 1.2s ease-out 0.3s both;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	.subtitle {
		font-size: clamp(1.5rem, 3.5vw, 2.5rem);
		color: rgba(245, 245, 245, 0.95);
		margin-bottom: 4rem;
		font-weight: 400;
		line-height: 1.4;
		text-shadow: 
			1px 1px 3px rgba(0, 0, 0, 0.9),
			2px 2px 15px rgba(0, 0, 0, 0.6);
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.line {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 700;
		margin: 0 0 1rem;
		line-height: 1.3;
		color: #f5f5f5;
		text-shadow: 
			2px 2px 4px rgba(0, 0, 0, 0.9),
			4px 4px 20px rgba(0, 0, 0, 0.5);
		letter-spacing: -0.01em;

		&.emphasis {
			font-size: clamp(1.25rem, 3vw, 1.875rem);
			font-weight: 600;
			color: #ff8787;
			margin-top: 1.5rem;
			line-height: 1.5;
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

		.video-source {
			bottom: 1rem;
			left: 1rem;
			font-size: 0.65rem;
			padding: 0.4rem 0.7rem;

			svg {
				width: 12px;
				height: 12px;
			}
		}
	}
</style>
