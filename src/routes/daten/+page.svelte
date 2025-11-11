<script lang="ts">
	import { decades } from '$lib/data/decades';
</script>

<svelte:head>
	<title>Daten und Methodik | Wie du zum Raucher wurdest</title>
</svelte:head>

<main class="data-page">
	<div class="container-narrow">
		<header>
			<a href="/" class="back-link">← Zurück zur Geschichte</a>
			<h1>Daten und Methodik</h1>
		</header>

		<section class="intro">
			<p>
				Diese Scrollytelling-Erfahrung basiert auf historischen Daten über Tabakkonsum,
				Werbung und gesundheitliche Auswirkungen von den 1950er Jahren bis heute.
			</p>
		</section>

		<section class="methodology">
			<h2>Datenquellen</h2>
			<p>Die verwendeten Daten stammen aus folgenden Quellen:</p>
			<ul>
				<li>
					<strong>WHO Tobacco Control Database:</strong> Weltweite Statistiken zu Tabakkonsum und
					tabakbedingten Todesfällen
				</li>
				<li>
					<strong>OECD Health Statistics:</strong> Langzeitdaten zum Zigarettenkonsum in
					Industrieländern
				</li>
				<li>
					<strong>US Surgeon General Reports:</strong> Historische Berichte zu gesundheitlichen
					Auswirkungen des Rauchens
				</li>
				<li>
					<strong>Tobacco Advertising Expenditure Studies:</strong> Daten zu Werbeausgaben der
					Tabakindustrie
				</li>
			</ul>
		</section>

		<section class="chart-descriptions">
			<h2>Diagrammerklärungen</h2>

			{#each decades as decade}
				<article class="chart-description">
					<h3>{decade.decade}: {decade.title}</h3>
					<p><strong>Was das Diagramm zeigt:</strong></p>
					<p>{decade.chartExplainer}</p>
					<p><strong>Kontext:</strong></p>
					{#each decade.narrative as paragraph}
						<p>{paragraph}</p>
					{/each}
				</article>
			{/each}
		</section>

		<section class="accessibility">
			<h2>Barrierefreiheit</h2>
			<p>
				Alle Diagramme enthalten ARIA-Labels und Beschreibungen für Screenreader. Bei aktivierter
				Einstellung für reduzierte Bewegung werden Animationen minimiert.
			</p>
		</section>

		<section class="sources">
			<h2>Weiterführende Quellen</h2>
			<ul>
				<li>
					<a
						href="https://www.who.int/news-room/fact-sheets/detail/tobacco"
						target="_blank"
						rel="noopener noreferrer"
					>
						WHO Tobacco Fact Sheet
					</a>
				</li>
				<li>
					<a
						href="https://www.cdc.gov/tobacco/data_statistics/"
						target="_blank"
						rel="noopener noreferrer"
					>
						CDC Tobacco Data & Statistics
					</a>
				</li>
				<li>
					<a href="https://www.rauchfrei-info.de" target="_blank" rel="noopener noreferrer">
						Rauchfrei Info (BZgA)
					</a>
				</li>
			</ul>
		</section>

		<footer class="page-footer">
			<p>
				Erstellt mit SvelteKit, D3.js, und GSAP. Inspiriert von The Pudding's
				Scrollytelling-Arbeiten.
			</p>
			<p>Alle Daten dienen Bildungszwecken und sind zum angegebenen Zeitpunkt korrekt.</p>
		</footer>
	</div>
</main>

<style lang="scss">
	.data-page {
		background: #0a0a0a;
		color: #f5f5f5;
		min-height: 100vh;
		padding: 4rem 2rem;
	}

	header {
		margin-bottom: 3rem;
	}

	.back-link {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: none;
		margin-bottom: 1rem;
		transition: color 0.3s ease;

		&:hover {
			color: #ff6b6b;
		}
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: 1rem;
	}

	h2 {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		margin-top: 3rem;
		margin-bottom: 1.5rem;
		color: #ff8787;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #ff6b6b;
	}

	section {
		margin-bottom: 4rem;
	}

	p {
		font-size: 1.125rem;
		line-height: 1.75;
		margin-bottom: 1rem;
		color: #d0d0d0;
	}

	ul {
		list-style: none;
		padding: 0;

		li {
			padding-left: 2rem;
			position: relative;
			margin-bottom: 1rem;
			font-size: 1.125rem;
			line-height: 1.75;
			color: #d0d0d0;

			&::before {
				content: '→';
				position: absolute;
				left: 0;
				color: #ff6b6b;
			}
		}
	}

	.chart-description {
		background: rgba(26, 26, 26, 0.6);
		padding: 2rem;
		border-radius: 12px;
		border-left: 4px solid #ff6b6b;
		margin-bottom: 2rem;
	}

	a {
		color: #ff6b6b;
		text-decoration: underline;

		&:hover {
			color: #ff8787;
		}
	}

	.page-footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid #2a2a2a;
		text-align: center;

		p {
			font-size: 1rem;
			color: #a0a0a0;
		}
	}
</style>
