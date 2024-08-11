import { DashboardOverviewData } from '../../../core/constant/DashboardOverviewData/DashboardOverviewData';
import { Badge } from '../Badge';

export const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-2 mt-2">
        {DashboardOverviewData.map((item, index) => (
          <div
            key={index}
            className="w-full shadow-lg cursor-pointer relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-90 transition-all"
          >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <Badge type="info" message={item.title} className="text-md"></Badge>
              </div>
              <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">{item.icon}</div>
            </div>
            <div className="mt-4">
              <p className="text-pretty text-lg text-gray-500">{item.stats}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
