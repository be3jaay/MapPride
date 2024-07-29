import { DashboardOverviewData } from '../../../core/constant/DashboardOverviewData/DashboardOverviewData';

export const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-centerm justify-between gap-2 mt-2">
        {DashboardOverviewData.map(item => (
          <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black">{item.title}</p>
                <p className="text-2xl font-medium text-gray-900">{item.stats}</p>
              </div>
              <span className="rounded-full bg-indigo-700 p-3 text-white">{item.icon}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
