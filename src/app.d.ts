declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.json' {
	const value: any;
	export default value;
}

declare module '*.geojson' {
	const value: any;
	export default value;
}

export {};
