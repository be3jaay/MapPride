import { AdminDashboardOverviewData } from '../../../core/constant/DashboardOverviewData/AdminDashboardOverviewData';
import { BarGraph } from '../Chart/Bar';
import { LineGraph } from '../Chart/Line';
import { PieGraph } from '../Chart/Pie';

export const AdminDashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-centerm justify-between gap-2 mt-2">
        {AdminDashboardOverviewData.map(item => (
          <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-indigo-700">{item.title}</p>
                <p className="text-xl font-medium text-gray-900">{item.stats}</p>
              </div>
              <span className="rounded-full bg-indigo-50 p-3 text-indigo-700 text-xl">{item.icon}</span>
            </div>
          </article>
        ))}
      </div>

      <div class="grid grid-cols-12 gap-2 mt-4 w-full h-full ">
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full p-4 ">
          <BarGraph />
        </div>
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full p-4 ">
          <LineGraph />
        </div>
        <div className="col-span-12 bg-indigo-200 rounded-md  w-full h-[32rem] p-4 flex items-center justify-center ">
          <PieGraph />
        </div>
      </div>
    </div>
  );
};
