import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollTriggerInstance = ScrollTrigger | null;

export function initScrollOrchestrator() {
	ScrollTrigger.config({
		limitCallbacks: true,
		ignoreMobileResize: true
	});
}

export function createSectionScroll(
	sectionId: string,
	onUpdate: (progress: number) => void,
	pinContent = true

) {
	const section = document.querySelector(`#${sectionId}`);
	if (!section) return null;

	const trigger = ScrollTrigger.create({
		trigger: section,
		start: 'top top',
		end: '+=100%',
		pin: pinContent,
		pinSpacing: true,
		scrub: true,
		onUpdate: (self) => {
			onUpdate(self.progress);
		},
		invalidateOnRefresh: true,
		markers: false
	});

	return trigger;
}

export function createVideoScroll(videoElement: HTMLVideoElement, sectionId: string) {
	if (!videoElement) return null;

	const trigger = ScrollTrigger.create({
		trigger: `#${sectionId}`,
		start: 'top top',
		end: '+=150%',
		scrub: 1,
		onUpdate: (self) => {
			const duration = videoElement.duration;
			if (duration && !isNaN(duration)) {
				videoElement.currentTime = duration * self.progress;
			}
		}
	});

	return trigger;
}

export function createLottieScroll(
	animationInstance: { goToAndStop: (frame: number, isFrame: boolean) => void },
	sectionId: string,
	totalFrames: number
) {
	if (!animationInstance) return null;

	const trigger = ScrollTrigger.create({
		trigger: `#${sectionId}`,
		start: 'top center',
		end: '+=100%',
		scrub: 1,
		onUpdate: (self) => {
			const frame = Math.floor(totalFrames * self.progress);
			animationInstance.goToAndStop(frame, true);
		}
	});

	return trigger;
}

export function destroyScrollTriggers() {
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function refreshScrollTriggers() {
	ScrollTrigger.refresh();
}

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
