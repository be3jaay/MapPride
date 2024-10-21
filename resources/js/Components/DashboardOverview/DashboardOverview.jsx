import { useEffect, useState } from 'react';
import UserAnalytics from '../UserAnalytics/UserAnalytics';
import { Alert } from '../Alert';
import { IoStarSharp } from 'react-icons/io5';
import axios from 'axios';
import { Badge } from '../Badge';

export const DashboardOverview = () => {
  const [highestRatedMap, setHighestRatedMap] = useState(null);

  useEffect(() => {
    const fetchHighestRatedMap = async () => {
      try {
        const response = await axios.get('/api/maps/highest-rated');
        if (response.data?.highest_rated_map) {
          const highestRatedMap = response.data.highest_rated_map;
          highestRatedMap.average_rating = parseFloat(highestRatedMap.average_rating).toFixed(1);
          setHighestRatedMap(highestRatedMap);
        }
      } catch (error) {
        console.error('Error fetching highest rated map:', error);
      }
    };
    fetchHighestRatedMap();
  }, []);

  return (
    <div className="w-full sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-col gap-0 lg:flex-row lg:gap-2 lg:mt-2">
        <UserAnalytics />
      </div>
      {highestRatedMap && (
        <div className="w-[30rem] flex items-center justify-center flex-col">
          <Alert message=" Featured as the highest rated inclusive environment" type="info" />

          <article className="rounded-lg mt-6 w-full flex items-center justify-center">
            <div className="card w-full bg-white flex items-center justify-center">
              <div className="w-full">
                <img
                  src={highestRatedMap.image ? highestRatedMap.image : '/path/to/default/image.jpg'}
                  aria-hidden
                  alt="Map Image"
                  className="h-[30rem] w-full"
                />
              </div>
              <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div className="w-full">
                    <Badge type="info" message={highestRatedMap.average_rating} className="py-3 px-6">
                      <IoStarSharp className="ml-1 text-indigo-700" />
                    </Badge>
                    <hr className="w-full my-4" />
                  </div>
                </div>
                <div className="gap-3">
                  <h3 className=" font-bold text-sm text-gray-700  sm:text-xl">{highestRatedMap.title}</h3>
                  <span className=" text-pretty text-sm text-gray-700 font-bold flex items-center">
                    Address: {highestRatedMap.address}
                  </span>
                  <span className="ext-pretty text-sm text-gray-700 font-bold flex items-center">
                    Available Services: {highestRatedMap.services.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
