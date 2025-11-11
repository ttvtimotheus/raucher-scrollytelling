import * as d3 from 'd3';

export interface WorldDeathsFeature {
	type: string;
	properties: {
		name: string;
		deaths: number;
	};
	geometry: {
		type: string;
		coordinates: number[];
	};
}

export interface WorldDeathsData {
	type: string;
	features: WorldDeathsFeature[];
}

interface WorldDeathsInstance {
	update: (progress: number) => void;
	destroy: () => void;
}

export async function initWorldDeaths(
	container: HTMLElement,
	data: WorldDeathsData
): Promise<WorldDeathsInstance> {
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };
	const width = container.clientWidth - margin.left - margin.right;
	const height = Math.min(600, container.clientHeight) - margin.top - margin.bottom;

	const svg = d3
		.select(container)
		.append('svg')
		.attr('width', '100%')
		.attr('height', height + margin.top + margin.bottom)
		.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		.attr('role', 'img')
		.attr('aria-labelledby', 'world-deaths-title');

	svg
		.append('title')
		.attr('id', 'world-deaths-title')
		.text('Weltweite Tabak-Todesfälle pro Jahr');

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	g.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', width)
		.attr('height', height)
		.attr('fill', '#0a0a0a')
		.attr('stroke', '#2a2a2a')
		.attr('stroke-width', 1);

	const projection = d3
		.geoMercator()
		.center([0, 20])
		.scale(width / 6.5)
		.translate([width / 2, height / 2]);

	const path = d3.geoPath().projection(projection);

	// Lade und zeichne Weltkarte mit echten Ländergrenzen
	try {
		// Natural Earth 110m Länder (niedrige Auflösung für schnelles Laden)
		const geoData: any = await d3.json('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson');
		
		// Zeichne Länder
		g.append('g')
			.attr('class', 'countries')
			.selectAll('path')
			.data(geoData.features)
			.enter()
			.append('path')
			.attr('d', (d: any) => path(d))
			.attr('fill', '#1a1a1a')
			.attr('stroke', '#3a3a3a')
			.attr('stroke-width', 0.5);
	} catch (error) {
		console.warn('Could not load world map data, using graticule fallback:', error);
		
		// Fallback zu Graticule wenn Laden fehlschlägt
		const graticule = d3.geoGraticule();
		g.append('path')
			.datum(graticule)
			.attr('class', 'graticule')
			.attr('d', path as any)
			.attr('fill', 'none')
			.attr('stroke', '#2a2a2a')
			.attr('stroke-width', 0.5)
			.attr('opacity', 0.3);
	}

	const sizeScale = d3
		.scaleSqrt()
		.domain([0, d3.max(data.features, (d) => d.properties.deaths)!])
		.range([0, 60]);

	const dots = g
		.selectAll('.death-dot')
		.data(data.features)
		.enter()
		.append('circle')
		.attr('class', 'death-dot')
		.attr('cx', (d) => {
			const coords = projection(d.geometry.coordinates as [number, number]);
			return coords ? coords[0] : 0;
		})
		.attr('cy', (d) => {
			const coords = projection(d.geometry.coordinates as [number, number]);
			return coords ? coords[1] : 0;
		})
		.attr('r', 0)
		.attr('fill', '#ff6b6b')
		.attr('opacity', 0.7);

	const labels = g
		.selectAll('.death-label')
		.data(data.features.filter((d) => d.properties.deaths > 200))
		.enter()
		.append('text')
		.attr('class', 'death-label')
		.attr('x', (d) => {
			const coords = projection(d.geometry.coordinates as [number, number]);
			return coords ? coords[0] : 0;
		})
		.attr('y', (d) => {
			const coords = projection(d.geometry.coordinates as [number, number]);
			return coords ? coords[1] - 10 : 0;
		})
		.attr('text-anchor', 'middle')
		.style('fill', '#f5f5f5')
		.style('font-size', '12px')
		.style('opacity', 0)
		.text((d) => d.properties.name);

	return {
		update(progress: number) {
			const clampedProgress = Math.max(0, Math.min(1, progress));
			
			dots.attr('r', (d) => sizeScale(d.properties.deaths) * clampedProgress);
			
			labels.style('opacity', clampedProgress > 0.7 ? clampedProgress : 0);
		},
		destroy() {
			svg.remove();
		}
	};
}
