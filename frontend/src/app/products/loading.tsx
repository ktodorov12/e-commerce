import { Skeleton } from '@/lib/shared/Skeleton';

const SKELETON_CARD_COUNT = 8;

export default function ProductsLoading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-10">
      <div className="mb-6 flex items-baseline justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mb-8 flex items-center justify-between border-b border-divider pb-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-9 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
