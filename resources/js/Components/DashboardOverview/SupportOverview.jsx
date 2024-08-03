import { SupportData, HotlineData } from '../../../core/constant/SupportData/SupportData';
import { Alert } from '../Alert';

export const SupportOverview = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-star justify-between flex-col gap-6 mt-2">
        <Alert
          type="info"
          message="Support Services"
          description="In this section, you will be able to see all available support services and hotline services."
        />
        <div className="flex items-center justify-center gap-2">
          {SupportData.map(item => (
            <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full shadow-md cursor-pointer hover:opacity-80">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-3xl text-indigo-700">{item.icon}</p>
                    <p className="text-3xl text-indigo-700 font-bold">{item.title}</p>
                  </div>
                </div>
                <div className="gap-2 flex flex-col">
                  <span className="text-black text-md">{item.description}</span>
                  <span className="text-black text-xl font-bold">{item.phoneNumber}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Alert
          type="info"
          message="Hotline Services"
          description="In this section, you will be able to see all available support services and hotline services."
        />
        <div className="flex items-center justify-center gap-2">
          {HotlineData.map(item => (
            <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full shadow-md cursor-pointer hover:opacity-80">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-3xl text-indigo-700">{item.icon}</p>
                    <p className="text-3xl text-indigo-700 font-bold">{item.title}</p>
                  </div>
                </div>
                <div className="gap-2 flex flex-col">
                  <span className="text-black text-md">{item.description}</span>
                  <span className="text-black text-xl font-bold">{item.phoneNumber}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
