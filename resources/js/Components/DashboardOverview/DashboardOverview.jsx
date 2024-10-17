import UserAnalytics from '../UserAnalytics/UserAnalytics';

export const DashboardOverview = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-col gap-0 lg:flex-row lg:gap-2 lg:mt-2">
        <UserAnalytics />
      </div>
    </div>
  );
};
