import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaArrowRightLong } from 'react-icons/fa6';
import recruitment from '../../../core/images/recruitment.png';

export default function Training({ auth }) {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get('/api/training');
        const data = response.data.data;

        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.tabs_title]) {
            acc[item.tabs_title] = [];
          }
          acc[item.tabs_title].push(item);
          return acc;
        }, {});

        const formattedTabs = Object.keys(groupedData).map(title => ({
          title,
          content: (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {groupedData[title].map(item => (
                <div key={item.id} className="card bg-white w-full cursor-pointer hover:scale-90 transition-all">
                  <div className="card-body shadow-lg cursor-pointer relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
                        <img src={recruitment} alt="" className="w-14 h-14" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500">{item.description}</p>
                    </div>
                    <PrimaryButton className="w-full text-white justify-center py-3 mt-6 ">View Here</PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          ),
        }));
        setTabs(formattedTabs);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchTraining();
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Training" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Training Platform"
              description="In this section, you will be able to see all the training resources that will help you to develop your skills / talent, thus becoming a better version of yourself."
            />
          </div>
          <div className="my-4">
            <CustomTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
