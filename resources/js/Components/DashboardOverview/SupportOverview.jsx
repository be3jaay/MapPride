import { useEffect, useState } from 'react';
import { Alert } from '../Alert';
import axios from 'axios';
import { useToastNotifications } from '../../../core/hooks';
import { BiSupport } from 'react-icons/bi';
import { TfiSupport } from 'react-icons/tfi';
import Loading from '../Loading';
import { Badge } from '../Badge';

export const SupportOverview = () => {
  const [supportData, setSupportData] = useState([]);
  const [hotlineData, setHotlineData] = useState([]);

  const { notifyError } = useToastNotifications();

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const response = await axios.get('/api/support');
        setSupportData(response.data.data);
      } catch (error) {
        notifyError('Data cannot be found.');
      }
    };

    fetchSupport();
  }, []);

  useEffect(() => {
    const fetchHotline = async () => {
      try {
        const response = await axios.get('/api/hotlines');
        setHotlineData(response.data.data);
      } catch (error) {
        notifyError('Data cannot be found.');
      }
    };

    fetchHotline();
  }, []);

  return (
    <div className="py-12 max-w-full mx-auto sm:px-6 lg:px-8">
      <div className="flex items-star justify-between flex-col gap-6 mt-2">
        <Alert
          type="info"
          message="Support Services"
          description="In this section, you will be able to see all available support services and hotline services."
        />
        <div className="flex items-center justify-center gap-2">
          {supportData && supportData.length > 0 ? (
            supportData.map((support, index) => (
              <div
                key={index}
                className="w-full shadow-lg bg-white relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div>
                    <Badge type="info" message={support.title} className="text-lg p-4"></Badge>
                  </div>
                  <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">
                    <TfiSupport />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-pretty text-sm text-gray-500">{support.description}</p>
                </div>
                <dl className="mt-6 flex gap-4 sm:gap-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">+63 {support.phoneNumber}</dt>
                    <dd className="text-md text-black font-bold">Contact Number</dd>
                  </div>
                </dl>
              </div>
            ))
          ) : (
            <Loading type="primary" />
          )}
        </div>
        <div className="mt-12">
          <Alert
            type="info"
            message="Hotline Services"
            description="In this section, you will be able to see all available support services and hotline services."
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          {hotlineData && hotlineData.length > 0 ? (
            hotlineData.map((support, index) => (
              <div
                key={index}
                className="w-full shadow-lg bg-white  relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 transition-all"
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                <div className="sm:flex sm:justify-between sm:gap-4">
                  <div>
                    <Badge type="info" message={support.title} className="text-lg p-4"></Badge>
                  </div>
                  <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">
                    <BiSupport />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-pretty text-sm text-gray-500">{support.description}</p>
                </div>
                <dl className="mt-6 flex gap-4 sm:gap-6">
                  <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">+63 {support.phoneNumber}</dt>
                    <dd className="text-md text-black font-bold">Contact Number</dd>
                  </div>
                </dl>
              </div>
            ))
          ) : (
            <Loading type="primary" />
          )}
        </div>
      </div>
    </div>
  );
};
