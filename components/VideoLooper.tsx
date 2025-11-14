'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoLooperProps {
  videoSlug: string;
  poster?: string;
  ariaLabel?: string;
}

export function VideoLooper({ videoSlug, poster = '', ariaLabel = 'Archival video loop' }: VideoLooperProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setHasLoaded(true);
            videoEl.load();
          }
        });
      },
      { rootMargin: '100px' },
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        poster={poster}
        aria-label={ariaLabel}
        className="block h-full w-full object-cover saturate-110 contrast-105"
      >
        <source src={`/video/${videoSlug}.mp4`} type="video/mp4" />
        <source src={`/video/${videoSlug}.webm`} type="video/webm" />
      </video>
    </div>
  );
}

export default VideoLooper;
