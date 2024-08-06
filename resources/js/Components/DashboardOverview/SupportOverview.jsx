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
                className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full shadow-md cursor-pointer hover:opacity-80"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-indigo-700">
                        <TfiSupport />
                      </span>
                      <p className="text-3xl text-indigo-700 font-bold">{support.title}</p>
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col">
                    <span className="text-black text-md">{support.description}</span>
                    <span className="text-black text-xl font-bold">{support.phoneNumber}</span>
                  </div>
                </div>
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
                className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full shadow-md cursor-pointer hover:opacity-80"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-indigo-700">
                        <BiSupport />
                      </span>
                      <p className="text-3xl text-indigo-700 font-bold">{support.title}</p>
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col">
                    <span className="text-black text-md">{support.description}</span>
                    <span className="text-black text-xl font-bold">{support.phoneNumber}</span>
                  </div>
                </div>
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
