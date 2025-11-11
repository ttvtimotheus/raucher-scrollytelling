<script lang="ts">
	import { birthYear } from '$lib/stores/birthYear';

	let inputValue = '';

	function handleSubmit() {
		const year = parseInt(inputValue, 10);
		if (year >= 1950 && year <= 2010) {
			birthYear.set(year);
		}
	}
</script>

<section class="birth-year-control">
	<div class="container-narrow">
		<h2>Wann wurdest du geboren?</h2>
		<p>Erzähl uns dein Geburtsjahr. Wir zeigen dir, welche Werbung dich prägte.</p>
		
		<form on:submit|preventDefault={handleSubmit}>
			<input
				type="number"
				bind:value={inputValue}
				min="1950"
				max="2010"
				placeholder="z.B. 1995"
				aria-label="Geburtsjahr eingeben"
			/>
			<button type="submit">Weiter zur Geschichte</button>
		</form>
		
		<button class="skip" on:click={() => birthYear.set(null)}>
			Ohne Jahrgang weitermachen
		</button>
	</div>
</section>

<style lang="scss">
	.birth-year-control {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
		padding: 4rem 2rem;
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 1rem;
		text-align: center;
	}

	p {
		font-size: 1.25rem;
		color: #a0a0a0;
		text-align: center;
		margin-bottom: 3rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
	}

	input {
		padding: 1rem 1.5rem;
		font-size: 1.25rem;
		background: #2a2a2a;
		border: 2px solid #3a3a3a;
		color: #f5f5f5;
		border-radius: 8px;
		text-align: center;
		transition: border-color 0.3s ease;

		&:focus {
			outline: none;
			border-color: #ff6b6b;
		}

		&::placeholder {
			color: #6a6a6a;
		}
	}

	button[type='submit'] {
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		background: #ff6b6b;
		color: #fff;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.3s ease;

		&:hover {
			background: #ff5252;
		}
	}

	.skip {
		display: block;
		margin: 2rem auto 0;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		color: #a0a0a0;
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
		transition: color 0.3s ease;

		&:hover {
			color: #f5f5f5;
		}
	}

	@media (max-width: 640px) {
		h2 {
			font-size: 1.75rem;
		}

		p {
			font-size: 1rem;
		}

		input,
		button[type='submit'] {
			font-size: 1rem;
		}
	}
</style>
