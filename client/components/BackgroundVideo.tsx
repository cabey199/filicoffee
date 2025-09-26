import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  poster?: string;
  playbackRate?: number; // default 1
  fadeEdges?: boolean; // add vertical fades so sections flow smoothly
}

export default function BackgroundVideo({
  src,
  className,
  overlayClassName,
  poster,
  playbackRate = 1,
  fadeEdges = true,
}: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const applyRate = () => {
      try {
        el.playbackRate = playbackRate;
        // Some browsers respect defaultPlaybackRate on subsequent plays
        (el as any).defaultPlaybackRate = playbackRate;
      } catch {}
    };
    applyRate();
    el.addEventListener("loadedmetadata", applyRate, { once: true });
    return () => el.removeEventListener("loadedmetadata", applyRate);
  }, [playbackRate, src]);

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      <video
        ref={ref}
        className="h-full w-full object-cover min-h-full min-w-full [transform:translateZ(0)]"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlayClassName ? <div className={cn("absolute inset-0 pointer-events-none", overlayClassName)} /> : null}
      {fadeEdges ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-black/40 to-transparent" />
        </>
      ) : null}
    </div>
  );
}
