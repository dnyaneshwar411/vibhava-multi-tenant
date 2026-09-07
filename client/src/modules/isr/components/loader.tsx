export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Modern minimal visual indicator */}
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Subtle outer pulse aura */}
          <div className="absolute inset-0 rounded-none bg-primary/10 animate-ping opacity-75" />

          {/* Minimalist geometric boundary */}
          <div className="relative h-8 w-8 rounded-none border border-border bg-card/50 shadow-sm flex items-center justify-center">
            {/* Inner progress bar accent */}
            <div className="h-2 w-2 rounded-none bg-primary animate-pulse" />
          </div>
        </div>

        {/* Minimalist SaaS typography & progress indicator */}
        <div className="flex flex-col items-center space-y-1">
          <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground animate-pulse">
            Loading...
          </span>
          <div className="h-[1px] w-12 overflow-hidden bg-border/60">
            <div className="h-full w-full bg-primary/80 animate-[shimmer_1.5s_infinite_linear] origin-left" />
          </div>
        </div>
      </div>
    </div>
  );
}