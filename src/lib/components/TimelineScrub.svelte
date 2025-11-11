<script lang="ts">
	import { onMount } from 'svelte';

	export let decades: Array<{ year: string; color: string; label: string }> = [
		{ year: '1950', color: '#d4a574', label: 'Nostalgie' },
		{ year: '1970', color: '#e8c547', label: 'Gewöhnung' },
		{ year: '1980', color: '#ff6bcd', label: 'Verführung' },
		{ year: '1990', color: '#ff6b6b', label: 'Rebellion' },
		{ year: '2000', color: '#6bb6ff', label: 'Ernüchterung' },
		{ year: '2010', color: '#b8a6ff', label: 'Täuschung' }
	];

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let currentDecade = 0;
	let particles: Array<{
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
	}> = [];
	let animationId: number;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		// Erstelle Rauchpartikel
		for (let i = 0; i < 50; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 1,
				vy: -Math.random() * 2 - 1,
				size: Math.random() * 40 + 20,
				opacity: Math.random() * 0.4 + 0.1
			});
		}

		animate();

		return () => {
			if (animationId) cancelAnimationFrame(animationId);
		};
	});

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const currentColor = decades[currentDecade].color;
		const rgb = hexToRgb(currentColor);

		particles.forEach(p => {
			p.x += p.vx;
			p.y += p.vy;
			p.opacity *= 0.995;

			if (p.y < -50 || p.opacity < 0.05) {
				p.y = canvas.height + 50;
				p.x = Math.random() * canvas.width;
				p.opacity = Math.random() * 0.4 + 0.1;
			}

			if (p.x < 0 || p.x > canvas.width) {
				p.vx *= -1;
			}

			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
			ctx.fill();
		});

		animationId = requestAnimationFrame(animate);
	}

	function hexToRgb(hex: string) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: { r: 255, g: 107, b: 107 };
	}

	function handleDecadeClick(index: number) {
		currentDecade = index;
	}
</script>

<div class="timeline-scrub">
	<h3 class="timeline-title">Die Farbgeschichte des Rauchens</h3>
	<p class="timeline-subtitle">Klicke auf ein Jahrzehnt und sieh, wie sich die Stimmung ändert</p>

	<canvas bind:this={canvas} class="smoke-canvas"></canvas>

	<div class="timeline-decades">
		{#each decades as decade, i}
			<button
				class="decade-button"
				class:active={currentDecade === i}
				style="--decade-color: {decade.color}"
				on:click={() => handleDecadeClick(i)}
			>
				<span class="decade-year">{decade.year}er</span>
				<span class="decade-label">{decade.label}</span>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.timeline-scrub {
		position: relative;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		background: #0a0a0a;
		overflow: hidden;
	}

	.timeline-title {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
		margin: 0 0 1rem;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.timeline-subtitle {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: rgba(255, 255, 255, 0.6);
		margin: 0 0 3rem;
		text-align: center;
		position: relative;
		z-index: 2;
	}

	.smoke-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.6;
		z-index: 1;
	}

	.timeline-decades {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		position: relative;
		z-index: 2;
		max-width: 900px;
	}

	.decade-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem 2rem;
		background: rgba(255, 255, 255, 0.05);
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.4s ease;
		min-width: 140px;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
			border-color: var(--decade-color);
			transform: translateY(-4px) scale(1.05);
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
		}

		&.active {
			background: rgba(255, 255, 255, 0.15);
			border-color: var(--decade-color);
			box-shadow: 
				0 0 30px var(--decade-color),
				0 0 60px var(--decade-color);
			transform: scale(1.1);

			.decade-year {
				color: var(--decade-color);
			}
		}

		.decade-year {
			font-size: 1.5rem;
			font-weight: 700;
			color: rgba(255, 255, 255, 0.9);
			transition: color 0.4s ease;
		}

		.decade-label {
			font-size: 0.875rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: rgba(255, 255, 255, 0.6);
		}
	}

	@media (max-width: 768px) {
		.timeline-scrub {
			min-height: 60vh;
			padding: 3rem 1rem;
		}

		.timeline-decades {
			gap: 0.75rem;
		}

		.decade-button {
			padding: 1rem 1.5rem;
			min-width: 110px;

			.decade-year {
				font-size: 1.25rem;
			}
		}
	}
</style>
