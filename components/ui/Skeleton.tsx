export function Skeleton({ className = "" }: { className?: string }) {
    return <div className={`skeleton ${className}`} />;
}

export function ProductCardSkeleton() {
    return (
        <div className="rounded-lg bg-white overflow-hidden">
            <div className="aspect-[3/4] skeleton" />
            <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: count }, (_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
