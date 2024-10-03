import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert } from '@/Components/Alert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomTabs } from '@/Components/Tabs/CustomTabs';
import PrimaryButton from '@/Components/PrimaryButton';
import recruitment from '../../../core/images/recruitment.png';
import { useDateFormat } from '../../../core/hooks';
import { Badge } from '@/Components/Badge';
import TrainingCard from '@/Components/TrainingCard';

export default function Training({ auth }) {
  const [tabs, setTabs] = useState([]);
  const { getFormattedDate } = useDateFormat();

  const formattedDate = dateString => {
    return getFormattedDate(dateString);
  };

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get('/api/training/view-all');
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
                <TrainingCard item={item} key={item.id} recruitment={recruitment} formattedDate={formattedDate} />
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
        <div className="w-full px-4 mx-auto sm:px-6 lg:px-8">
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
