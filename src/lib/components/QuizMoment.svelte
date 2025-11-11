<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	export let question: string;
	export let options: Array<{ label: string; value: number | string }>;
	export let correctAnswer: number | string;
	export let explanation: string;
	export let chartData: any = null;

	let selected: number | string | null = null;
	let revealed = false;
	let quizContainer: HTMLElement;
	let resultContainer: HTMLElement;

	function handleSelect(value: number | string) {
		selected = value;
	}

	function reveal() {
		if (!selected) return;
		revealed = true;

		// Animate result reveal
		setTimeout(() => {
			gsap.from(resultContainer, {
				opacity: 0,
				y: 40,
				scale: 0.95,
				duration: 0.8,
				ease: 'power3.out'
			});
		}, 100);
	}

	$: isCorrect = selected === correctAnswer;
</script>

<div class="quiz-moment" bind:this={quizContainer}>
	<div class="quiz-question">
		<h3>{question}</h3>
	</div>

	{#if !revealed}
		<div class="quiz-options">
			{#each options as option}
				<button
					class="quiz-option"
					class:selected={selected === option.value}
					on:click={() => handleSelect(option.value)}
				>
					{option.label}
				</button>
			{/each}
		</div>

		<button
			class="reveal-button"
			disabled={!selected}
			on:click={reveal}
		>
			Antwort zeigen
		</button>
	{:else}
		<div class="quiz-result" bind:this={resultContainer}>
			<div class="result-indicator" class:correct={isCorrect} class:incorrect={!isCorrect}>
				{#if isCorrect}
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
					<p class="result-text">Richtig!</p>
				{:else}
					<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="15" y1="9" x2="9" y2="15"></line>
						<line x1="9" y1="9" x2="15" y2="15"></line>
					</svg>
					<p class="result-text">Nicht ganz...</p>
				{/if}
			</div>

			<div class="correct-answer">
				<p class="answer-label">Die richtige Antwort ist:</p>
				<p class="answer-value">{options.find(o => o.value === correctAnswer)?.label}</p>
			</div>

			<div class="explanation">
				<p>{explanation}</p>
			</div>

			{#if chartData}
				<div class="mini-chart">
					<!-- Chart placeholder für visuelle Darstellung -->
					<div class="chart-placeholder">📊</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.quiz-moment {
		max-width: 700px;
		margin: 0 auto;
		padding: 3rem 2rem;
	}

	.quiz-question {
		margin-bottom: 2rem;

		h3 {
			font-size: clamp(1.5rem, 3vw, 2.25rem);
			font-weight: 600;
			line-height: 1.3;
			color: rgba(255, 255, 255, 0.95);
			text-align: center;
		}
	}

	.quiz-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.quiz-option {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.125rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background: rgba(255, 255, 255, 0.1);
			border-color: rgba(255, 255, 255, 0.3);
			transform: translateY(-2px);
		}

		&.selected {
			background: rgba(255, 107, 107, 0.2);
			border-color: #ff6b6b;
			box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
		}
	}

	.reveal-button {
		display: block;
		margin: 0 auto;
		padding: 1rem 3rem;
		background: #ff6b6b;
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover:not(:disabled) {
			background: #ff8787;
			transform: scale(1.05);
			box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	.quiz-result {
		text-align: center;
	}

	.result-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;

		svg {
			width: 64px;
			height: 64px;
		}

		&.correct {
			svg {
				color: #4ade80;
			}
		}

		&.incorrect {
			svg {
				color: #ff6b6b;
			}
		}

		.result-text {
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0;
		}
	}

	.correct-answer {
		padding: 2rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		margin-bottom: 2rem;

		.answer-label {
			font-size: 0.875rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: rgba(255, 255, 255, 0.6);
			margin: 0 0 0.5rem;
		}

		.answer-value {
			font-size: 1.75rem;
			font-weight: 700;
			color: #ff6b6b;
			margin: 0;
		}
	}

	.explanation {
		p {
			font-size: 1.125rem;
			line-height: 1.7;
			color: rgba(255, 255, 255, 0.85);
		}
	}

	@media (max-width: 768px) {
		.quiz-moment {
			padding: 2rem 1rem;
		}

		.quiz-options {
			grid-template-columns: 1fr;
		}
	}
</style>
