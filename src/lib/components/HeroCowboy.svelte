<script lang="ts">
	import { onMount } from 'svelte';
	import VideoLooper from './VideoLooper.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let heroSection: HTMLElement;
	let videoBackground: HTMLElement;
	let heroContent: HTMLElement;
	let line1: HTMLElement;
	let line2: HTMLElement;
	let line3: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Sequenzielle Text-Reveal Animation
		const tl = gsap.timeline({ delay: 0.5 });
		tl.from(line1, { 
			opacity: 0, 
			y: 30, 
			filter: 'blur(10px)',
			duration: 1.2, 
			ease: 'power3.out'
		})
		.from(line2, { 
			opacity: 0, 
			y: 30, 
			filter: 'blur(10px)',
			duration: 1.2, 
			ease: 'power3.out'
		}, '-=0.6')
		.from(line3, { 
			opacity: 0, 
			y: 30, 
			filter: 'blur(10px)',
			duration: 1.2, 
			ease: 'power3.out'
		}, '-=0.6');

		// Rauch-Effekt beim Scrollen: Video fädet aus
		ScrollTrigger.create({
			trigger: heroSection,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			onUpdate: (self) => {
				const progress = self.progress;
				// Video fädet aus und verschwimmt (Rauch-Effekt)
				gsap.to(videoBackground, {
					opacity: 1 - progress,
					filter: `blur(${progress * 20}px) brightness(${1 - progress * 0.5})`,
					scale: 1 + progress * 0.2,
					duration: 0
				});
				// Text fädet auch aus
				gsap.to(heroContent, {
					opacity: 1 - progress * 1.5,
					y: -progress * 100,
					duration: 0
				});
			}
		});
	});

	function scrollToNext() {
		const nextSection = document.querySelector('#birth-year-section');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section id="hero-cowboy" class="hero-cowboy" bind:this={heroSection}>
	<div class="video-background" bind:this={videoBackground}>
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

	<div class="hero-content" bind:this={heroContent}>
		<div class="voice-over">
			<p class="voice-line" bind:this={line1}>Er war stark. Frei. Unabhängig.</p>
			<p class="voice-line" bind:this={line2}>Und er war nie echt.</p>
		</div>
		
		<h1 class="hero-title" bind:this={line3}>
			<span class="title-line">Der Marlboro Mann</span><br/>
			<span class="title-line">war eine Lüge</span>
		</h1>

		<div class="scroll-hint" on:click={scrollToNext} on:keydown={(e) => e.key === 'Enter' && scrollToNext()} role="button" tabindex="0">
			<span>Scroll</span>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 5v14M19 12l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
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
		max-width: 1100px;
		width: 100%;
	}

	.voice-over {
		margin-bottom: 3rem;
	}

	.voice-line {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 400;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.95);
		margin: 0 0 1rem;
		text-shadow: 
			2px 2px 4px rgba(0, 0, 0, 0.9),
			3px 3px 20px rgba(0, 0, 0, 0.6);
		font-style: italic;
	}

	h1.hero-title {
		font-size: clamp(3rem, 12vw, 7rem);
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -0.03em;
		color: #ffffff;
		margin: 0 0 3rem;
		text-shadow: 
			3px 3px 6px rgba(0, 0, 0, 0.9),
			6px 6px 25px rgba(0, 0, 0, 0.4);
	}

	.title-line {
		display: inline-block;
		white-space: nowrap;
	}

	.scroll-hint {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			color: rgba(255, 255, 255, 0.9);
			transform: translateY(3px);
		}

		svg {
			animation: bounce 2s ease-in-out infinite;
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(8px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-content {
			animation: none;
		}

		.scroll-hint svg {
			animation: none;
		}
	}

	@media (max-width: 768px) {
		.voice-line {
			font-size: 1.25rem;
		}
		
		h1.hero-title {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 640px) {
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
