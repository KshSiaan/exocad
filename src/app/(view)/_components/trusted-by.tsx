const LOGOS = Array.from({ length: 5 }, (_, i) => i);

function LogoItem() {
  return (
    <div className="flex items-center gap-2 text-white/35 shrink-0 select-none">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className="size-8"
        aria-hidden="true"
      >
        <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.25" />
        <path
          d="M5 9h8M9 5v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[13px] font-medium tracking-wide lowercase">
        logoipsum
      </span>
    </div>
  );
}

export function TrustedBy() {
  return (
    <div className="bg-background p-6 sm:p-2 border-t border-b border-white/[0.07]">
      <div className="px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-0 py-4">
          <p className="text-foreground text-[13px] font-medium shrink-0 whitespace-nowrap sm:pr-8  sm:border-white/10">
            Trusted By Dental Professionals Worldwide
          </p>
          <div className="grid grid-cols-3 mt-6 sm:mt-0 sm:flex items-center gap-10 sm:pl-8 overflow-x-auto scrollbar-none w-full sm:w-auto">
            {LOGOS.map((i) => (
              <LogoItem key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
