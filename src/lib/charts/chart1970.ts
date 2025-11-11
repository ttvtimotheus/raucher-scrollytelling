import * as d3 from 'd3';

export interface Chart1970Data {
	year: number;
	percent: number;
}

interface Chart1970Instance {
	update: (progress: number) => void;
	destroy: () => void;
}

export function initChart1970(
	container: HTMLElement,
	data: Chart1970Data[]
): Chart1970Instance {
	const margin = { top: 40, right: 40, bottom: 60, left: 80 };
	const width = container.clientWidth - margin.left - margin.right;
	const height = Math.min(400, container.clientHeight) - margin.top - margin.bottom;

	const svg = d3
		.select(container)
		.append('svg')
		.attr('width', '100%')
		.attr('height', height + margin.top + margin.bottom)
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr('role', 'img')
		.attr('aria-labelledby', 'chart1970-title');

	svg
		.append('title')
		.attr('id', 'chart1970-title')
		.text('Anteil rauchender Erwachsener 1960-1970');

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xScale = d3
		.scaleBand()
		.domain(data.map((d) => d.year.toString()))
		.range([0, width])
		.padding(0.2);

	const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`);

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${height})`)
		.call(xAxis)
		.selectAll('text')
		.style('fill', '#a0a0a0');

	g.append('g').attr('class', 'y-axis').call(yAxis).selectAll('text').style('fill', '#a0a0a0');

	// Reference line at 70%
	g.append('line')
		.attr('x1', 0)
		.attr('x2', width)
		.attr('y1', yScale(70))
		.attr('y2', yScale(70))
		.attr('stroke', '#ff6b6b')
		.attr('stroke-width', 2)
		.attr('stroke-dasharray', '5,5')
		.attr('opacity', 0);

	// Bars
	const bars = g
		.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d) => xScale(d.year.toString())!)
		.attr('width', xScale.bandwidth())
		.attr('y', height)
		.attr('height', 0)
		.attr('fill', '#ff6b6b');

	g.selectAll('.domain').style('stroke', '#a0a0a0');
	g.selectAll('.tick line').style('stroke', '#a0a0a0');

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			
			bars
				.attr('y', (d) => yScale(d.percent * clampedProgress))
				.attr('height', (d) => height - yScale(d.percent * clampedProgress));

			g.select('line').attr('opacity', clampedProgress > 0.5 ? clampedProgress : 0);
		},
		destroy() {
			svg.remove();
		}
	};
}
