import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';

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
                <div key={item.id} className="cursor-pointer hover:opacity-90 hover:scale-90 transition-all">
                  <div className="card bg-base-100 w-full shadow-md h-60">
                    <div className="card-body bg-indigo-200 text-black text-center">
                      <h2 className="card-title justify-center bg-indigo-600 text-white rounded-lg p-3 mb-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-500">{item.description}</p>
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
