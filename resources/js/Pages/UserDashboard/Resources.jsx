import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import book from '../../../core/images/book.png';
import { useDateFormat } from '../../../core/hooks';
import { ResourcesCard } from '@/Components/ResourcesCard';

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
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 mt-4">
              {groupedData[title].map(item => (
                <ResourcesCard book={book} formatDate={formatDate} item={item} />
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
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-200 overflow-hidden shadow-sm sm:rounded-lg">
            <Alert
              type="info"
              message="Resources Module"
              description="In this section, you will be able to see all the available resources that will help you develop and understand more about LGBTQ+."
            />
          </div>
          <div className="my-4 flex">
            <CustomTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
