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

	// Rauchpartikel Canvas Hintergrund
	const canvas = document.createElement('canvas');
	canvas.width = width + margin.left + margin.right;
	canvas.height = height + margin.top + margin.bottom;
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.pointerEvents = 'none';
	canvas.style.opacity = '0.15';
	container.appendChild(canvas);
	
	const ctx = canvas.getContext('2d')!;
	const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, opacity: number}> = [];
	let animationId: number | null = null;
	
	// Erstelle Rauchpartikel
	for (let i = 0; i < 30; i++) {
		particles.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: (Math.random() - 0.5) * 0.5,
			vy: -Math.random() * 0.3 - 0.2,
			size: Math.random() * 30 + 10,
			opacity: Math.random() * 0.3 + 0.1
		});
	}
	
	function animateSmoke() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		particles.forEach(p => {
			p.x += p.vx;
			p.y += p.vy;
			p.opacity *= 0.99;
			
			if (p.y < -50 || p.opacity < 0.01) {
				p.y = canvas.height + 50;
				p.x = Math.random() * canvas.width;
				p.opacity = Math.random() * 0.3 + 0.1;
			}
			
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255, 107, 107, ${p.opacity})`;
			ctx.fill();
		});
		
		animationId = requestAnimationFrame(animateSmoke);
	}
	animateSmoke();

	const svg = d3
		.select(container)
		.append('svg')
		.attr('width', '100%')
		.attr('height', height + margin.top + margin.bottom)
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr('role', 'img')
		.attr('aria-labelledby', 'chart1950-title chart1950-desc')
		.style('position', 'relative')
		.style('z-index', '1');

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
		.y((d) => yScaleConsumption(d.consumption))
		.curve(d3.curveNatural);

	const lineDeaths = d3
		.line<Chart1950Data>()
		.x((d) => xScale(d.year))
		.y((d) => yScaleDeaths(d.deaths));

	// Consumption line mit Glow-Effekt
	const consumptionPath = g
		.append('path')
		.datum(data)
		.attr('class', 'line-consumption')
		.attr('d', lineConsumption)
		.attr('fill', 'none')
		.attr('stroke', '#ff6b6b')
		.attr('stroke-width', 3)
		.attr('filter', 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.8))')
		.attr('stroke-dasharray', function (this: SVGPathElement) {
			return this.getTotalLength();
		})
		.attr('stroke-dashoffset', function (this: SVGPathElement) {
			return this.getTotalLength();
		});

	// Deaths line mit Glow-Effekt
	const deathsPath = g
		.append('path')
		.datum(data)
		.attr('class', 'line-deaths')
		.attr('d', lineDeaths)
		.attr('fill', 'none')
		.attr('stroke', '#6bb6ff')
		.attr('stroke-width', 3)
		.attr('filter', 'drop-shadow(0 0 8px rgba(107, 182, 255, 0.8))')
		.attr('stroke-dasharray', function (this: SVGPathElement) {
			return this.getTotalLength();
		})
		.attr('stroke-dashoffset', function (this: SVGPathElement) {
			return this.getTotalLength();
		});

	const consumptionLength = consumptionPath.node()!.getTotalLength();
	const deathsLength = deathsPath.node()!.getTotalLength();

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
			if (animationId) cancelAnimationFrame(animationId);
			d3.select(container).selectAll('*').remove();
			if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
		}
	};
}
