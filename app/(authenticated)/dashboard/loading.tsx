// app/dashboard/loading.tsx

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";


const Loading = () => {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-2 py-12 sm:py-24 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
