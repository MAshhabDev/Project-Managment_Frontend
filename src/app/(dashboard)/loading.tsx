export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner Shimmer */}
      <div className="p-6 lg:p-8 rounded-2xl border border-border/60 bg-muted/30 relative overflow-hidden animate-pulse">
        <div className="space-y-3 max-w-md">
          <div className="h-5 w-32 rounded-full bg-muted/70" />
          <div className="h-8 w-3/4 rounded-xl bg-muted/70" />
          <div className="h-4 w-full rounded-lg bg-muted/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="p-5 rounded-2xl border border-border/60 bg-card/60 shadow-xs space-y-3 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded-md bg-muted/70" />
              <div className="size-8 rounded-xl bg-muted/60" />
            </div>
            <div className="h-7 w-16 rounded-lg bg-muted/80" />
            <div className="h-3 w-32 rounded-md bg-muted/50" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="space-y-1">
              <div className="h-5 w-44 rounded-lg bg-muted/70 animate-pulse" />
              <div className="h-3 w-64 rounded-md bg-muted/50 animate-pulse" />
            </div>
            <div className="h-6 w-16 rounded-md bg-muted/50 animate-pulse" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="p-4 rounded-2xl border border-border/60 bg-card/60 shadow-xs space-y-3 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-16 rounded-full bg-muted/70" />
                    <div className="h-3.5 w-24 rounded-md bg-muted/50" />
                  </div>
                  <div className="h-6 w-20 rounded-xl bg-muted/60" />
                </div>
                <div className="h-5 w-48 rounded-md bg-muted/80" />
                <div className="h-3 w-full max-w-sm rounded-md bg-muted/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="h-5 w-32 rounded-lg bg-muted/70 animate-pulse" />
            <div className="h-3 w-40 rounded-md bg-muted/50 animate-pulse" />
          </div>

          <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-xs space-y-4 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-2">
                <div className="h-4 w-28 rounded-md bg-muted/70" />
                <div className="h-3 w-full rounded-md bg-muted/50" />
              </div>
            ))}
            <div className="h-9 w-full rounded-xl bg-muted/60 pt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}