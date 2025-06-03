import { Skeleton } from "../ui/skeleton";

const SummaryCardSkeleton = () => {
  return (
    <div>
      <div className="relative h-full border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex items-start gap-4 mb-4">
          <Skeleton className="w-8 h-8 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <div className="space-y-2 pl-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCardSkeleton;
