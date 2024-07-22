import { ResourcesData } from '../ResourcesData/ResourcesData';

export const ResourcesTabs = [
  {
    title: 'LGBTQ Rights',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary w-full text-white">{item.button}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Policies Related to LGBTQ',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary w-full text-white">{item.button}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Do's and don'ts as LGBTQ individual",
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary w-full text-white">{item.button}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];
