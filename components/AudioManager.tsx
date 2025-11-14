'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  { id: '2010s', src: '/audio/lofi-beat.mp3', element: null, volume: 0 },
];

export function AudioManager() {
  const [userInteracted, setUserInteracted] = useState(false);
  const tracksRef = useRef<AudioTrack[]>(tracks);

  const initAudioTracks = useCallback(() => {
    console.log('🎵 Initialisiere Audio-Tracks...');

    tracksRef.current.forEach((track) => {
      console.log(`Loading: ${track.src}`);
      track.element = new Audio(track.src);
      track.element.loop = true;
      track.element.volume = 0;
      track.element.preload = 'auto';

      track.element.addEventListener('canplaythrough', () => {
        console.log(`✅ ${track.id} geladen`);
      });

      track.element.addEventListener('error', (e) => {
        console.error(`❌ ${track.id} Fehler:`, e);
      });

      track.element
        .play()
        .then(() => {
          console.log(`▶️ ${track.id} spielt`);
        })
        .catch((e) => {
          console.error(`❌ Play failed for ${track.id}:`, e);
        });
    });

    setTimeout(() => {
      setupScrollTriggers();
    }, 500);
  }, []);

  const setupScrollTriggers = () => {
    console.log('🎯 Setup ScrollTriggers...');

    const decades = [
      { id: '1950s', selector: '[data-decade="1950"]', volume: 0.5 },
      { id: '1970s', selector: '[data-decade="1970"]', volume: 0.5 },
      { id: '1980s', selector: '[data-decade="1980"]', volume: 0.5 },
      { id: '1990s', selector: '[data-decade="1990"]', volume: 0.5 },
      { id: '2000s', selector: '[data-decade="2000"]', volume: 0.4 },
      { id: '2010s', selector: '[data-decade="2010"]', volume: 0.5 },
    ];

    decades.forEach(({ id, selector, volume }) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const track = tracksRef.current.find((t) => t.id === id);
      if (!track?.element) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          console.log(`🎵 ${id} ENTER`);
          if (track.element) {
            gsap.to(track.element, { volume, duration: 1.5, ease: 'power2.inOut' });
          }
        },
        onLeave: () => {
          console.log(`🎵 ${id} LEAVE`);
          if (track.element) {
            gsap.to(track.element, { volume: 0, duration: 1.5, ease: 'power2.inOut' });
          }
        },
        onEnterBack: () => {
          if (track.element) {
            gsap.to(track.element, { volume, duration: 1.5, ease: 'power2.inOut' });
          }
        },
        onLeaveBack: () => {
          if (track.element) {
            gsap.to(track.element, { volume: 0, duration: 1.5, ease: 'power2.inOut' });
          }
        },
      });
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const enableAudio = () => {
      if (userInteracted) return;
      setUserInteracted(true);
      initAudioTracks();
    };

    const handleClick = () => enableAudio();
    const handleScroll = () => enableAudio();

    document.addEventListener('click', handleClick, { once: true });
    document.addEventListener('scroll', handleScroll, { once: true });

    const timeout = setTimeout(() => {
      if (!userInteracted) {
        console.log('⚠️ Warte auf User-Interaktion (Click oder Scroll)...');
      }
    }, 1000);

    return () => {
      const currentTracks = tracksRef.current;
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
      currentTracks.forEach((track) => {
        if (track.element) {
          track.element.pause();
          track.element = null;
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInteracted]);


  return <div className="hidden" aria-hidden="true" />;
}

export default AudioManager;
