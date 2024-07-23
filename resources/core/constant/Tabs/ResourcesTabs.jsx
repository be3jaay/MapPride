import PrimaryButton from '@/Components/PrimaryButton';
import { ResourcesData } from '../ResourcesData/ResourcesData';
import { FaArrowRightLong } from 'react-icons/fa6';

export const ResourcesTabs = [
  {
    title: 'Legal Rights',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <PrimaryButton className="w-full text-white justify-center py-4">
                  {item.button}
                  <FaArrowRightLong className="ml-2" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Health',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <PrimaryButton className="w-full text-white justify-center py-4">
                  {item.button}
                  <FaArrowRightLong className="ml-2" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'LGBTQ+',
    content: (
      <div class="grid grid-cols-2 gap-4 mt-4">
        {ResourcesData.map(item => (
          <div className="card bg-base-100 w-full shadow-md">
            <div className="card-body bg-indigo-200 text-black">
              <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
              <p className="text-black my-2">{item.description}</p>
              <div className="card-actions justify-center">
                <PrimaryButton className="w-full text-white justify-center py-4">
                  {item.button}
                  <FaArrowRightLong className="ml-2" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];
