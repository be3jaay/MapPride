export const SkeletonLoading = () => {
  return (
    <div class="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
      <div class="animate-pulse flex flex-row-reverse space-x-4">
        <div class="rounded-full bg-slate-700 h-10 w-10 ml-4"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h- bg-slate-700 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-6">
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
