import { Skeleton } from '@/lib/shared/Skeleton';

/** Trailing placeholder for a ListingProductCard while the next page streams
    in — mirrors its photo well + name/price line so appended rows don't jump. */
export const ProductCardSkeleton = () => (
  <div aria-hidden="true" className="flex flex-col gap-2">
    <Skeleton className="aspect-[3/4] w-full" />
    <span className="flex items-baseline justify-between gap-3">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-10 shrink-0" />
    </span>
  </div>
);
