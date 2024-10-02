import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import anonymous from '../../../core/images/anonymous.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from '@/Components/Badge';
import { RiMapPinUserFill } from 'react-icons/ri';
import { useDateFormat } from '../../../core/hooks';

export default function Experience({ auth }) {
  const [experience, setExperience] = useState([]);
  const { getFormattedDate } = useDateFormat();

  useEffect(() => {
    const fetchApprovedExperiences = async () => {
      try {
        const response = await axios.get('/api/experience');
        setExperience(response.data.data);
      } catch (error) {
        console.error('Error fetching approved experiences:', error);
      }
    };
    fetchApprovedExperiences();
  }, []);

  const formatDate = dateString => {
    if (!dateString) return '';
    try {
      return getFormattedDate(dateString);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Experience" />

      <div className=" py-4 lg:py-12">
        <div className="w-full px-4  sm:px-6 lg:px-8">
          <div className="bg-indigo-200  overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Map-Pride Freedom Wall"
              description="This is a freedom wall - These posted below are the approved shared experiences of users."
            />
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 mt-4 h-full">
            {experience.map((item, index) =>
              item.approved ? (
                <div
                  key={index}
                  className="shadow-lg relative block overflow-hidden rounded-lg bg-white border border-gray-100 p-4 sm:p-6 lg:p-8 "
                >
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <Badge type="info" message={item.location} className="text-lg p-4">
                        <RiMapPinUserFill className="ml-2 text-2xl" />
                      </Badge>
                      <p className="mt-3 text-xs font-medium text-gray-600">Posted By: {item.username}</p>
                    </div>
                    <div className="hidden sm:block sm:shrink-0">
                      <img src={anonymous} alt="" className="w-14 h-14" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-500 text-ellipsis overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-full mt-6 flex gap-4 sm:gap-6 items-end justify-star">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">{formatDate(item.created_at)}</dt>
                      <dd className="text-xs text-gray-500">Created At</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">{item.experience_type}</dt>
                      <dd className="text-xs text-gray-500">Type</dd>
                    </div>
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
