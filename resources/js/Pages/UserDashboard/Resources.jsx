import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import PrimaryButton from '@/Components/PrimaryButton';
import book from '../../../core/images/book.png';
import { useDateFormat } from '../../../core/hooks';

export default function Resources({ auth }) {
  const [tabs, setTabs] = useState([]);
  const { getFormattedDate } = useDateFormat();

  const formatDate = dateString => {
    return getFormattedDate(dateString);
  };

  useEffect(() => {
    const fetchResources = async () => {
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
              {groupedData[title].map((item, index) => (
                <a href={item.url_link} target="_blank">
                  <div key={index} className="card w-full ">
                    <div className="card-body bg-white shadow-lg cursor-pointer relative overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-90 transition-all  flex flex-col justify-between">
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                      <div>
                        <div className="sm:flex sm:justify-between sm:gap-4">
                          <div className="flex items-center justify-between w-full">
                            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">{item.title}</h3>
                            <img src={book} alt="" className="w-14 h-14" />
                          </div>
                        </div>
                        <div className="my-4">
                          <p className="text-sm text-gray-500 h-60 overflow-hidden text-ellipsis">{item.description}</p>
                        </div>
                      </div>
                      <div>
                        <span>Updated at: {formatDate(item.updated_at)}</span>
                        <PrimaryButton className="w-full text-white justify-center py-3 mt-6">Read More</PrimaryButton>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ),
        }));
        setTabs(formattedTabs);
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Resources" />
      <div className="py-12">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
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
