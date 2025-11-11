<script lang="ts">
	import { onMount } from 'svelte';

	export let videoSlug: string;
	export let poster = '';

	let videoElement: HTMLVideoElement;
	let isLoaded = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isLoaded) {
						isLoaded = true;
						if (videoElement) {
							videoElement.load();
						}
					}
				});
			},
			{ rootMargin: '100px' }
		);

		if (videoElement) {
			observer.observe(videoElement);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="video-looper">
	<video
		bind:this={videoElement}
		muted
		loop
		playsinline
		autoplay
		{poster}
		aria-label="Archival video loop"
	>
		<source src={`/video/${videoSlug}.mp4`} type="video/mp4" />
		<source src={`/video/${videoSlug}.webm`} type="video/webm" />
	</video>
</div>

<style lang="scss">
	.video-looper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: saturate(1.1) contrast(1.05);
	}
</style>
