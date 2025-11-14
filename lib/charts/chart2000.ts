import * as d3 from 'd3';

export interface Chart2000Data {
	year: number;
	adSpend: number;
	smokingRate: number;
}

interface Chart2000Instance {
	update: (progress: number) => void;
	destroy: () => void;
}

export function initChart2000(
	container: HTMLElement,
	data: Chart2000Data[]
): Chart2000Instance {
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
		.attr('aria-labelledby', 'chart2000-title');

	svg
		.append('title')
		.attr('id', 'chart2000-title')
		.text('Werbeausgaben und Rauchquote 2000-2010');

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xScale = d3
		.scaleLinear()
		.domain([d3.min(data, (d) => d.year)!, d3.max(data, (d) => d.year)!])
		.range([0, width]);

	const yScaleAd = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.adSpend)!])
		.range([height, 0]);

	const yScaleSmoking = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d.smokingRate)! + 5])
		.range([height, 0]);

	const xAxis = d3.axisBottom(xScale).tickFormat((d) => d.toString());
	const yAxisLeft = d3.axisLeft(yScaleAd).ticks(5);
	const yAxisRight = d3.axisRight(yScaleSmoking).ticks(5).tickFormat((d) => `${d}%`);

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

	g.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - margin.left + 20)
		.attr('x', 0 - height / 2)
		.attr('text-anchor', 'middle')
		.style('fill', '#ff6b6b')
		.style('font-size', '14px')
		.text('Werbeausgaben (Mio. EUR)');

	g.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', width + margin.right - 20)
		.attr('x', 0 - height / 2)
		.attr('text-anchor', 'middle')
		.style('fill', '#6bb6ff')
		.style('font-size', '14px')
		.text('Rauchquote (%)');

	const lineAd = d3
		.line<Chart2000Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScaleAd(d.adSpend));

	const lineSmoking = d3
		.line<Chart2000Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScaleSmoking(d.smokingRate));

	const adPath = g
		.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', '#ff6b6b')
		.attr('stroke-width', 3)
		.attr('d', lineAd);

	const smokingPath = g
		.append('path')
		.datum(data)
		.attr('fill', 'none')
		.attr('stroke', '#6bb6ff')
		.attr('stroke-width', 3)
		.attr('d', lineSmoking);

	const adLength = adPath.node()!.getTotalLength();
	const smokingLength = smokingPath.node()!.getTotalLength();

	adPath
		.attr('stroke-dasharray', `${adLength} ${adLength}`)
		.attr('stroke-dashoffset', adLength);

	smokingPath
		.attr('stroke-dasharray', `${smokingLength} ${smokingLength}`)
		.attr('stroke-dashoffset', smokingLength);

	g.selectAll('.domain').style('stroke', '#a0a0a0');
	g.selectAll('.tick line').style('stroke', '#a0a0a0');

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			adPath.attr('stroke-dashoffset', adLength * (1 - clampedProgress));
			smokingPath.attr('stroke-dashoffset', smokingLength * (1 - clampedProgress * 0.9));
		},
		destroy() {
			svg.remove();
		}
	};
}
