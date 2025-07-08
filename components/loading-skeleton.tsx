export function PostCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-muted rounded-lg overflow-hidden">
        <div className="h-48 bg-muted-foreground/20 animate-shimmer"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-muted-foreground/20 rounded animate-shimmer"></div>
          <div className="h-6 bg-muted-foreground/20 rounded animate-shimmer"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted-foreground/20 rounded animate-shimmer"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-3/4 animate-shimmer"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-muted-foreground/20 rounded w-20 animate-shimmer"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-16 animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted-foreground/20 rounded-2xl animate-shimmer"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-muted-foreground/20 rounded animate-shimmer"></div>
            <div className="h-3 bg-muted-foreground/20 rounded w-20 animate-shimmer"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted-foreground/20 rounded animate-shimmer"></div>
          <div className="h-3 bg-muted-foreground/20 rounded w-2/3 animate-shimmer"></div>
        </div>
        <div className="h-10 bg-muted-foreground/20 rounded animate-shimmer"></div>
      </div>
    </div>
  )
}

export function HeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-16 bg-muted border-b flex items-center">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted-foreground/20 rounded animate-shimmer"></div>
            <div className="w-24 h-6 bg-muted-foreground/20 rounded animate-shimmer"></div>
          </div>
          <div className="hidden md:flex gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-4 bg-muted-foreground/20 rounded animate-shimmer"></div>
            ))}
          </div>
          <div className="w-10 h-10 bg-muted-foreground/20 rounded animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}
