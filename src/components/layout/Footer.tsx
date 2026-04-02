export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Wave SVG divider */}
      <div className="pointer-events-none w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full md:h-24"
        >
          <path
            d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,50 1440,40 L1440,120 L0,120 Z"
            className="fill-navy-900"
          />
          <path
            d="M0,60 C320,20 640,90 960,50 C1120,30 1320,70 1440,60 L1440,120 L0,120 Z"
            className="fill-navy-900 opacity-60"
          />
        </svg>
      </div>

      <div className="relative bg-navy-900 px-6 pb-10 pt-8">
        {/* Top gradient stripe */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ocean-500/30 to-transparent" />

        {/* Subtle mini wave animation */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 overflow-hidden opacity-[0.04]">
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            className="animate-wave h-full w-[200%]"
          >
            <path
              d="M0,20 C180,35 360,5 540,20 C720,35 900,5 1080,20 C1260,35 1440,5 1620,20 C1800,35 1980,5 2160,20 C2340,35 2520,5 2700,20 L2880,20 L2880,40 L0,40 Z"
              fill="currentColor"
              className="text-ocean-400"
            />
          </svg>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
          <p className="font-display text-lg font-semibold tracking-wide text-foam-300">
            SAILBOAT &mdash; Apprendre le vocabulaire de la voile
          </p>
          <p className="text-sm text-foam-300/60">
            Fait avec le vent en poupe
          </p>
        </div>
      </div>
    </footer>
  );
}
