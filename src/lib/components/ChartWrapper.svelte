<script lang="ts">
	import { onMount } from 'svelte';
	import type { DecadeSection } from '$lib/data/decades';
	import { createSectionScroll } from '$lib/gsap/scrollOrchestrator';
	import { initChart1950 } from '$lib/charts/chart1950';
	import { initChart1970 } from '$lib/charts/chart1970';
	import { initChart1990 } from '$lib/charts/chart1990';
	import { initChart2000 } from '$lib/charts/chart2000';
	import { initChart2010 } from '$lib/charts/chart2010';
	import { initWorldDeaths } from '$lib/charts/worldDeaths';

	import series1950 from '$lib/data/series1950.json';
	import series1970 from '$lib/data/series1970.json';
	import series1990 from '$lib/data/series1990.json';
	import series2000 from '$lib/data/series2000.json';
	import series2010 from '$lib/data/series2010.json';
	import worldDeaths from '$lib/data/deaths_world.json';

	export let section: DecadeSection;

	let chartContainer: HTMLDivElement;
	let chartInstance: any;
	let scrollTrigger: any;

	onMount(() => {
		if (!chartContainer) return;

		(async () => {
			try {
				switch (section.chartType) {
					case '1950':
						chartInstance = initChart1950(chartContainer, series1950.data);
						break;
					case '1970':
						chartInstance = initChart1970(chartContainer, series1970.data);
						break;
					case '1980':
						chartInstance = initChart1970(chartContainer, series1970.data);
						break;
					case '1990':
						chartInstance = initChart1990(chartContainer, series1990.data);
						break;
					case '2000':
						chartInstance = initChart2000(chartContainer, series2000.data);
						break;
					case '2010':
						chartInstance = initChart2010(chartContainer, series2010.data);
						break;
					case 'world':
						chartInstance = await initWorldDeaths(chartContainer, worldDeaths);
						break;
				}

				if (chartInstance) {
					scrollTrigger = createSectionScroll(
						section.id,
						(progress) => {
							if (chartInstance && chartInstance.update) {
								chartInstance.update(progress);
							}
						},
						true
					);
				}
			} catch (error) {
				console.error('Chart initialization failed:', error);
			}
		})();

		return () => {
			if (chartInstance && chartInstance.destroy) {
				chartInstance.destroy();
			}
			if (scrollTrigger) {
				scrollTrigger.kill();
			}
		};
	});
</script>

<div class="chart-element" bind:this={chartContainer}></div>

<style lang="scss">
	.chart-element {
		width: 100%;
		min-height: 400px;
	}
</style>
