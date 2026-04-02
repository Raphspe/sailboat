import { cn } from '../../lib/cn';

interface WaveBackgroundProps {
  className?: string;
}

export default function WaveBackground({ className }: WaveBackgroundProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden',
        className,
      )}
    >
      {/* Wave layer 1 - fastest */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="animate-wave relative block h-24 w-[200%] md:h-36"
      >
        <path
          d="M0,120 C240,160 480,80 720,120 C960,160 1200,80 1440,120 C1680,160 1920,80 2160,120 C2400,160 2640,80 2880,120 L2880,200 L0,200 Z"
          className="fill-ocean-500/10"
        />
      </svg>

      {/* Wave layer 2 - medium */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="animate-wave-slow absolute bottom-0 block h-20 w-[200%] md:h-28"
      >
        <path
          d="M0,140 C360,100 720,170 1080,130 C1260,110 1380,150 1440,140 C1620,120 1800,160 2160,130 C2520,100 2700,150 2880,140 L2880,200 L0,200 Z"
          className="fill-ocean-400/8"
        />
      </svg>

      {/* Wave layer 3 - slowest */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="animate-wave absolute bottom-0 block h-16 w-[200%] md:h-20"
        style={{ animationDuration: '24s' }}
      >
        <path
          d="M0,160 C480,130 960,180 1440,150 C1920,120 2400,170 2880,160 L2880,200 L0,200 Z"
          className="fill-ocean-300/5"
        />
      </svg>
    </div>
  );
}
