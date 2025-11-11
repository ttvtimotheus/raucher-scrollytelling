import * as d3 from 'd3';

export interface Chart1990Data {
	year: number;
	teenRate: number;
}

interface Chart1990Instance {
	update: (progress: number) => void;
	destroy: () => void;
}

export function initChart1990(
	container: HTMLElement,
	data: Chart1990Data[]
): Chart1990Instance {
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
		.attr('aria-labelledby', 'chart1990-title');

	svg
		.append('title')
		.attr('id', 'chart1990-title')
		.text('Rauchquote bei Jugendlichen 1990-2000');

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(data, (d) => d.year)!, d3.max(data, (d) => d.year)!])
		.range([0, width]);

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.teenRate)! + 5])
		.range([height, 0]);

	const xAxis = d3.axisBottom(xScale).tickFormat((d) => d.toString());
	const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`);

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${height})`)
		.call(xAxis)
		.selectAll('text')
		.style('fill', '#a0a0a0');

	g.append('g').attr('class', 'y-axis').call(yAxis).selectAll('text').style('fill', '#a0a0a0');

	const line = d3
		.line<Chart1990Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScale(d.teenRate))
		.curve(d3.curveMonotoneX);

	const path = g
		.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('fill', 'none')
		.attr('stroke', '#ff6b6b')
		.attr('stroke-width', 3)
		.attr('d', line);

	const pathLength = path.node()!.getTotalLength();
	path
		.attr('stroke-dasharray', `${pathLength} ${pathLength}`)
		.attr('stroke-dashoffset', pathLength);

	// Dots
	const dots = g
		.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'dot')
		.attr('cx', (d) => xScale(d.year))
		.attr('cy', (d) => yScale(d.teenRate))
		.attr('r', 0)
		.attr('fill', '#ff6b6b');

	g.selectAll('.domain').style('stroke', '#a0a0a0');
	g.selectAll('.tick line').style('stroke', '#a0a0a0');

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			path.attr('stroke-dashoffset', pathLength * (1 - clampedProgress));
			dots.attr('r', clampedProgress > 0.7 ? 5 : 0);
		},
		destroy() {
			svg.remove();
		}
	};
}
