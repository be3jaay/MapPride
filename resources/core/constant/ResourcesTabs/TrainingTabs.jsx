import { TrainingData } from '..';

export const TrainingTabs = [
  {
    title: 'Information Technology',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {TrainingData.map(item => (
          <div className="cursor-pointer hover:opacity-90 hover:scale-90 transition-all ">
            <div className="card bg-base-100 w-full shadow-md h-60">
              <div className="card-body bg-indigo-200 text-black text-center">
                <h2 className="card-title justify-center bg-indigo-600 text-white rounded-lg p-3 mb-2">{item.title}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Business',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {TrainingData.map(item => (
          <div className="cursor-pointer hover:opacity-90 hover:scale-90 transition-all ">
            <div className="card bg-base-100 w-full shadow-md h-60">
              <div className="card-body bg-indigo-200 text-black text-center">
                <h2 className="card-title justify-center bg-indigo-600 text-white rounded-lg p-3 mb-2">{item.title}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Arts & Humanities',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {TrainingData.map(item => (
          <div className="cursor-pointer hover:opacity-90 hover:scale-90 transition-all ">
            <div className="card bg-base-100 w-full shadow-md h-60">
              <div className="card-body bg-indigo-200 text-black text-center">
                <h2 className="card-title justify-center bg-indigo-600 text-white rounded-lg p-3 mb-2">{item.title}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];
