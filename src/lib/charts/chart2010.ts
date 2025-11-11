import * as d3 from 'd3';

export interface Chart2010Data {
	year: number;
	vaping: number;
	cigarettes: number;
}

interface Chart2010Instance {
	update: (progress: number) => void;
	destroy: () => void;
}

export function initChart2010(
	container: HTMLElement,
	data: Chart2010Data[]
): Chart2010Instance {
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
		.attr('aria-labelledby', 'chart2010-title');

	svg
		.append('title')
		.attr('id', 'chart2010-title')
		.text('Vaping vs. Zigaretten bei Jugendlichen 2010-2020');

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xScale = d3
		.scaleBand()
		.domain(data.map((d) => d.year.toString()))
		.range([0, width])
		.padding(0.3);

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => Math.max(d.vaping, d.cigarettes))! + 5])
		.range([height, 0]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`);

	g.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${height})`)
		.call(xAxis)
		.selectAll('text')
		.style('fill', '#a0a0a0');

	g.append('g').attr('class', 'y-axis').call(yAxis).selectAll('text').style('fill', '#a0a0a0');

	const barWidth = xScale.bandwidth() / 2;

	const vapingBars = g
		.selectAll('.bar-vaping')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar-vaping')
		.attr('x', (d) => xScale(d.year.toString())!)
		.attr('width', barWidth)
		.attr('y', height)
		.attr('height', 0)
		.attr('fill', '#ff6b6b');

	const cigaretteBars = g
		.selectAll('.bar-cigarettes')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar-cigarettes')
		.attr('x', (d) => xScale(d.year.toString())! + barWidth)
		.attr('width', barWidth)
		.attr('y', height)
		.attr('height', 0)
		.attr('fill', '#6bb6ff');

	// Legend
	const legend = g.append('g').attr('transform', `translate(${width - 150}, 0)`);

	legend
		.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', 20)
		.attr('height', 20)
		.attr('fill', '#ff6b6b');

	legend
		.append('text')
		.attr('x', 25)
		.attr('y', 15)
		.style('fill', '#f5f5f5')
		.style('font-size', '14px')
		.text('Vaping');

	legend
		.append('rect')
		.attr('x', 0)
		.attr('y', 30)
		.attr('width', 20)
		.attr('height', 20)
		.attr('fill', '#6bb6ff');

	legend
		.append('text')
		.attr('x', 25)
		.attr('y', 45)
		.style('fill', '#f5f5f5')
		.style('font-size', '14px')
		.text('Zigaretten');

	g.selectAll('.domain').style('stroke', '#a0a0a0');
	g.selectAll('.tick line').style('stroke', '#a0a0a0');

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			
			vapingBars
				.attr('y', (d) => yScale(d.vaping * clampedProgress))
				.attr('height', (d) => height - yScale(d.vaping * clampedProgress));

			cigaretteBars
				.attr('y', (d) => yScale(d.cigarettes * clampedProgress))
				.attr('height', (d) => height - yScale(d.cigarettes * clampedProgress));
		},
		destroy() {
			svg.remove();
		}
	};
}
