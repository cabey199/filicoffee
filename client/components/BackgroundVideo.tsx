import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  poster?: string;
}

export default function BackgroundVideo({ src, className, overlayClassName, poster }: BackgroundVideoProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      <video
        className="h-full w-full object-cover min-h-full min-w-full [transform:translateZ(0)]"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}
    </div>
  );
}
