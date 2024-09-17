import UserAnalytics from '../UserAnalytics/UserAnalytics';

export const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-2 mt-2">
        <UserAnalytics />
        {/* <AvailableResources />
        <AvailableTraining /> */}
      </div>
    </div>
  );
};
