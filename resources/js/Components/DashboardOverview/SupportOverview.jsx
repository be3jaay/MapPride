import { useEffect, useState } from 'react';
import { Alert } from '../Alert';
import axios from 'axios';
import { useToastNotifications } from '../../../core/hooks';
import { BiSupport } from 'react-icons/bi';
import { TfiSupport } from 'react-icons/tfi';
import Loading from '../Loading';

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
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-star justify-between flex-col gap-6 mt-2">
        <Alert
          type="info"
          message="Support Services"
          description="In this section, you will be able to see all available support services and hotline services."
        />
        <div className="flex items-center justify-center gap-2">
          {supportData && supportData.length > 0 ? (
            supportData.map((support, index) => (
              <article
                key={index}
                className="w-full rounded-lg border border-gray-100 bg-white p-4 shadow-md transition hover:shadow-lg sm:p-6"
              >
                <span className="inline-block rounded bg-indigo-700 p-2 text-white text-2xl">
                  <TfiSupport />
                </span>
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">{support.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{support.description}</p>

                <span href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  +63 {support.phoneNumber}
                </span>
              </article>
            ))
          ) : (
            <Loading type="primary" />
          )}
        </div>
        <Alert
          type="info"
          message="Hotline Services"
          description="In this section, you will be able to see all available support services and hotline services."
        />
        <div className="flex items-center justify-center gap-2">
          {hotlineData && hotlineData.length > 0 ? (
            hotlineData.map((support, index) => (
              <article
                key={index}
                className="w-full rounded-lg border border-gray-100 bg-white p-4 shadow-md transition hover:shadow-lg sm:p-6"
              >
                <span className="inline-block rounded bg-indigo-700 p-2 text-white text-2xl">
                  <BiSupport />
                </span>
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">{support.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{support.description}</p>

                <span href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  +63 {support.phoneNumber}
                </span>
              </article>
            ))
          ) : (
            <Loading type="primary" />
          )}
        </div>
      </div>
    </div>
  );
};
