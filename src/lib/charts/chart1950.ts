import * as d3 from 'd3';

export interface Chart1950Data {
	year: number;
	consumption: number;
	deaths: number;
}

interface Chart1950Instance {
	update: (progress: number) => void;
	destroy: () => void;
}

export function initChart1950(
	container: HTMLElement,
	data: Chart1950Data[]
): Chart1950Instance {
	const margin = { top: 40, right: 80, bottom: 60, left: 80 };
	const width = container.clientWidth - margin.left - margin.right;
	const height = Math.min(500, container.clientHeight) - margin.top - margin.bottom;

	const svg = d3
		.select(container)
		.append('svg')
		.attr('width', '100%')
		.attr('height', height + margin.top + margin.bottom)
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr('role', 'img')
		.attr('aria-labelledby', 'chart1950-title chart1950-desc');

	svg.append('title').attr('id', 'chart1950-title').text('Zigarettenkonsum und Todesfälle 1950-1960');

	svg
		.append('desc')
		.attr('id', 'chart1950-desc')
		.text(
			'Liniendiagramm zeigt rasanten Anstieg des Zigarettenkonsums von 1950 bis 1960 und verzögerten Anstieg der Todesfälle'
		);

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(data, (d) => d.year)!, d3.max(data, (d) => d.year)!])
		.range([0, width]);

	const yScaleConsumption = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.consumption)!])
		.range([height, 0]);

	const yScaleDeaths = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.deaths)!])
		.range([height, 0]);

	// Axes
	const xAxis = d3.axisBottom(xScale).tickFormat((d) => d.toString());
	const yAxisLeft = d3.axisLeft(yScaleConsumption).ticks(5);
	const yAxisRight = d3.axisRight(yScaleDeaths).ticks(5);

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${height})`)
		.call(xAxis)
		.selectAll('text')
		.style('fill', '#a0a0a0');

	g.append('g').attr('class', 'y-axis-left').call(yAxisLeft).selectAll('text').style('fill', '#ff6b6b');

	g.append('g')
		.attr('class', 'y-axis-right')
		.attr('transform', `translate(${width},0)`)
		.call(yAxisRight)
		.selectAll('text')
		.style('fill', '#6bb6ff');

	// Axis labels
	g.append('text')
		.attr('class', 'y-label')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - margin.left + 20)
		.attr('x', 0 - height / 2)
		.attr('text-anchor', 'middle')
		.style('fill', '#ff6b6b')
		.style('font-size', '14px')
		.text('Zigaretten pro Kopf');

	g.append('text')
		.attr('class', 'y-label-right')
		.attr('transform', 'rotate(-90)')
		.attr('y', width + margin.right - 20)
		.attr('x', 0 - height / 2)
		.attr('text-anchor', 'middle')
		.style('fill', '#6bb6ff')
		.style('font-size', '14px')
		.text('Todesfälle (pro 100k)');

	// Line generators
	const lineConsumption = d3
		.line<Chart1950Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScaleConsumption(d.consumption));

	const lineDeaths = d3
		.line<Chart1950Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScaleDeaths(d.deaths));

	// Consumption line
	const consumptionPath = g
		.append('path')
		.datum(data)
		.attr('class', 'line-consumption')
		.attr('fill', 'none')
		.attr('stroke', '#ff6b6b')
		.attr('stroke-width', 3)
		.attr('d', lineConsumption);

	// Deaths line
	const deathsPath = g
		.append('path')
		.datum(data)
		.attr('class', 'line-deaths')
		.attr('fill', 'none')
		.attr('stroke', '#6bb6ff')
		.attr('stroke-width', 3)
		.attr('d', lineDeaths);

	const consumptionLength = consumptionPath.node()!.getTotalLength();
	const deathsLength = deathsPath.node()!.getTotalLength();

	consumptionPath
		.attr('stroke-dasharray', `${consumptionLength} ${consumptionLength}`)
		.attr('stroke-dashoffset', consumptionLength);

	deathsPath
		.attr('stroke-dasharray', `${deathsLength} ${deathsLength}`)
		.attr('stroke-dashoffset', deathsLength);

	// Style axes
	g.selectAll('.domain').style('stroke', '#a0a0a0');
	g.selectAll('.tick line').style('stroke', '#a0a0a0');

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			consumptionPath.attr('stroke-dashoffset', consumptionLength * (1 - clampedProgress));
			deathsPath.attr('stroke-dashoffset', deathsLength * (1 - clampedProgress * 0.8));
		},
		destroy() {
			svg.remove();
		}
	};
}
