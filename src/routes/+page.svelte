<script lang="ts">
	import { onMount } from 'svelte';
	import HeroCowboy from '$lib/components/HeroCowboy.svelte';
	import BirthYearControl from '$lib/components/BirthYearControl.svelte';
	import DecadeSection from '$lib/components/DecadeSection.svelte';
	import ChartWrapper from '$lib/components/ChartWrapper.svelte';
	import Interlude from '$lib/components/Interlude.svelte';
	import NarrativeBridge from '$lib/components/NarrativeBridge.svelte';
	import QuizMoment from '$lib/components/QuizMoment.svelte';
	import AudioManager from '$lib/components/AudioManager.svelte';
	import { decades } from '$lib/data/decades';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<main class="scrollytelling-container">
	<AudioManager />
	<HeroCowboy />

	<section id="birth-year-section">
		<BirthYearControl />
	</section>

	{#if mounted}
		<!-- 1950er: Visuelle Szene -->
		<DecadeSection 
			section={decades[0]} 
			chartComponent={ChartWrapper}
			layout="left"
		/>
		
		<!-- Bridge: 1950er Zusammenfassung -->
		<NarrativeBridge 
			title="Die Geburt einer Ikone"
			body="<p>In den 1950ern stieg der Zigarettenkonsum dramatisch. Aber das war kein Zufall.</p><p>Die Tabakindustrie erschuf den <strong>Marlboro Mann</strong> – eine Figur, die Freiheit, Männlichkeit und Unabhängigkeit verkörperte. Was niemand wußte: <em>Jede dieser Werbefiguren starb später an Lungenkrebs</em>.</p>"
			highlight="Sie haben Freiheit versprochen. Und Abhängigkeit verkauft."
		/>
		
		<!-- 1970er: Daten -->
		<DecadeSection 
			section={decades[1]} 
			chartComponent={ChartWrapper}
			layout="right"
		/>
		
		<!-- Bridge: 1970er Kontext -->
		<NarrativeBridge 
			title="Die ersten Warnungen"
			body="<p>In den 1970ern begannen Gesundheitswarnungen auf Zigarettenpackungen zu erscheinen. Die Industrie reagierte nicht mit Rückzug, sondern mit <strong>noch aggressiverer Werbung</strong>.</p><p>Fast die Hälfte aller Erwachsenen rauchte regelmäßig. Zigaretten waren nicht nur ein Produkt – sie waren Teil der Identität.</p>"
			highlight="Die Zigarette versprach nicht nur einen Moment. Sie versprach, wer du sein könntest."
			theme="yellow"
		/>
		
		<!-- Quiz: Werbeverbot -->
		<QuizMoment 
			question="Wann wurde Tabakwerbung im deutschen Fernsehen verboten?"
			options={[
				{ label: '1975', value: 1975 },
				{ label: '1989', value: 1989 },
				{ label: '2007', value: 2007 },
				{ label: '2021', value: 2021 }
			]}
			correctAnswer={2007}
			explanation="Erst 2007 wurde Tabakwerbung im deutschen Fernsehen vollständig verboten – später als in den meisten anderen europäischen Ländern. Außenwerbung (Plakate) war sogar bis 2021 erlaubt."
		/>
		
		<!-- 1980er: Visuelle Szene -->
		<DecadeSection 
			section={decades[2]} 
			chartComponent={ChartWrapper}
			layout="left"
			colorTheme="1980"
		/>
		
		<!-- Bridge: 1980er Strategie -->
		<NarrativeBridge 
			title="Die Emanzipation als Marketingstrategie"
			body="<p>Die 1980er brachten eine neue Zielgruppe: <strong>Frauen</strong>. 'You've Come a Long Way, Baby' war mehr als ein Slogan – es war eine Bewegung.</p><p>Die Industrie verkaufte Zigaretten als Symbol der Emanzipation. Der Anteil rauchender Frauen stieg dramatisch, während Männer langsam zurückgingen.</p>"
			highlight="Was wie Feminismus aussah, war Manipulation."
		/>
		
		<!-- 1990er: Daten -->
		<DecadeSection 
			section={decades[3]} 
			chartComponent={ChartWrapper}
			layout="right"
		/>
		
		<!-- Bridge: 1990er Youth Culture -->
		<NarrativeBridge 
			title="Die coole Rebellion"
			body="<p>In den 1990ern fokussierte sich die Werbung auf <strong>Teenager</strong>. Joe Camel wurde zur Ikone einer Generation – cool, rebellisch, unabhängig.</p><p>Die Zahlen sprechen für sich: <em>Jugendliche rauchten in Rekordzahlen</em>. Was als Rebellion gegen das System verkauft wurde, war genau das, was das System wollte.</p>"
			highlight="Jede Generation glaubt, sie wählt frei. Jede Generation wird gezielt manipuliert."
		/>
		
		<!-- 2000er: Visuelle Szene -->
		<DecadeSection 
			section={decades[4]} 
			chartComponent={ChartWrapper}
			layout="left"
		/>
		
		<!-- Bridge: 2000er Wandel -->
		<NarrativeBridge 
			title="Der Rückzug der Giganten"
			body="<p>Die 2000er markierten einen Wendepunkt. Werbeverbote wurden stärker, Raucherzahlen sanken, Werbebudgets schrumpften.</p><p>Aber die Industrie gab nicht auf. Sie veränderte nur ihre Strategie: <strong>Neue Produkte, neue Versprechen</strong>.</p>"
			highlight="Das Spiel blieb gleich. Nur die Regeln änderten sich."
			theme="blue"
		/>
		
		<!-- 2010er/2020er: Finale Daten -->
		<DecadeSection 
			section={decades[5]} 
			chartComponent={ChartWrapper}
			layout="right"
			colorTheme="2010"
		/>
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
