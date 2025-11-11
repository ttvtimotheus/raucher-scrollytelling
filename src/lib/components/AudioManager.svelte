<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	interface AudioTrack {
		id: string;
		src: string;
		element: HTMLAudioElement | null;
		volume: number;
	}

	const tracks: AudioTrack[] = [
		{ id: '1950s', src: '/audio/jazz-vinyl.mp3', element: null, volume: 0 },
		{ id: '1970s', src: '/audio/funk-loop.mp3', element: null, volume: 0 },
		{ id: '1980s', src: '/audio/synth-phaser.mp3', element: null, volume: 0 },
		{ id: '1990s', src: '/audio/grunge-loop.mp3', element: null, volume: 0 },
		{ id: '2000s', src: '/audio/clinic-ambient.mp3', element: null, volume: 0 },
		{ id: '2010s', src: '/audio/lofi-beat.mp3', element: null, volume: 0 }
	];

	let userInteracted = false;
	let audioContext: AudioContext | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Warte auf User-Interaktion (Browser-Requirement)
		const enableAudio = () => {
			if (userInteracted) return;
			userInteracted = true;
			
			try {
				audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
				initAudioTracks();
			} catch (e) {
				console.log('Audio context not available:', e);
			}

			document.removeEventListener('click', enableAudio);
			document.removeEventListener('scroll', enableAudio);
		};

		document.addEventListener('click', enableAudio, { once: true });
		document.addEventListener('scroll', enableAudio, { once: true });

		return () => {
			tracks.forEach(track => {
				if (track.element) {
					track.element.pause();
					track.element = null;
				}
			});
			if (audioContext) {
				audioContext.close();
			}
		};
	});

	function initAudioTracks() {
		tracks.forEach(track => {
			track.element = new Audio(track.src);
			track.element.loop = true;
			track.element.volume = 0;
			track.element.preload = 'auto';
			
			// Start playback (muted initially)
			track.element.play().catch(e => {
				console.log(`Could not play ${track.id}:`, e);
			});
		});

		setupScrollTriggers();
	}

	function setupScrollTriggers() {
		// 1950er Section
		const section1950 = document.querySelector('[data-decade="1950"]');
		if (section1950) {
			ScrollTrigger.create({
				trigger: section1950,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '1950s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.3; // Max 30%
						track.element.volume = volume;
					}
				}
			});
		}

		// 1970er Section
		const section1970 = document.querySelector('[data-decade="1970"]');
		if (section1970) {
			ScrollTrigger.create({
				trigger: section1970,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '1970s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.25;
						track.element.volume = volume;
					}
				}
			});
		}

		// 1980er Section
		const section1980 = document.querySelector('[data-decade="1980"]');
		if (section1980) {
			ScrollTrigger.create({
				trigger: section1980,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '1980s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.35;
						track.element.volume = volume;
					}
				}
			});
		}

		// 1990er Section
		const section1990 = document.querySelector('[data-decade="1990"]');
		if (section1990) {
			ScrollTrigger.create({
				trigger: section1990,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '1990s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.3;
						track.element.volume = volume;
					}
				}
			});
		}

		// 2000er Section
		const section2000 = document.querySelector('[data-decade="2000"]');
		if (section2000) {
			ScrollTrigger.create({
				trigger: section2000,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '2000s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.2;
						track.element.volume = volume;
					}
				}
			});
		}

		// 2010er Section
		const section2010 = document.querySelector('[data-decade="2010"]');
		if (section2010) {
			ScrollTrigger.create({
				trigger: section2010,
				start: 'top center',
				end: 'bottom center',
				onUpdate: (self) => {
					const progress = self.progress;
					const track = tracks.find(t => t.id === '2010s');
					if (track?.element) {
						const volume = Math.sin(progress * Math.PI) * 0.25;
						track.element.volume = volume;
					}
				}
			});
		}
	}
</script>

<!-- Audio Manager läuft unsichtbar im Hintergrund -->
<div class="audio-manager" style="display: none;"></div>
