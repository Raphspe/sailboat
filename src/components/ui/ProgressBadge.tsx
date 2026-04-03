interface ProgressBadgeProps {
  learned: number
  total: number
}

export default function ProgressBadge({ learned, total }: ProgressBadgeProps) {
  if (learned === 0) return null

  const allDone = learned >= total

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
        allDone
          ? 'bg-seagreen-500/15 text-seagreen-400'
          : 'bg-white/[0.06] text-foam-300/50'
      }`}
    >
      {allDone ? (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {learned}/{total}
        </>
      ) : (
        <>{learned}/{total}</>
      )}
    </span>
  )
}
