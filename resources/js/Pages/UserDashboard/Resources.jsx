import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function Resources({ auth }) {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchResoures = async () => {
      try {
        const response = await axios.get('/api/resources');
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
                <div className="card bg-base-100 w-full shadow-md h-[32rem]">
                  <div className="card-body bg-indigo-200 text-black">
                    <h2 className="card-title text-indigo-700 text-2xl">{item.title}</h2>
                    <p className="text-black my-2 overflow-hidden">{item.description}</p>
                    <div className="card-actions justify-center">
                      <PrimaryButton className="w-full text-white justify-center py-4">
                        {/* {item.button} */}Read More
                        <FaArrowRightLong className="ml-2" />
                      </PrimaryButton>
                    </div>
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

    fetchResoures();
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Resources" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-indigo-200 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Resources Module"
              description="In this section, you will be able to see all the available resources that will help you develop and understand more about LGBTQ+."
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
