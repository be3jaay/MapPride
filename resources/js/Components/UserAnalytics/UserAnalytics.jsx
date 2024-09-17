import React, { useEffect, useState } from 'react';
import { Badge } from '../Badge';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa6';

export default function UserAnalytics() {
  const [map, setMap] = useState([]);
  const [resources, setResources] = useState([]);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      const response = await axios.get(`/api/map`);
      setMap(response.data.data);
    };
    const fetchResources = async () => {
      const response = await axios.get(`/api/resources`);
      setResources(response.data.data);
    };
    const fetchTraining = async () => {
      const response = await axios.get(`/api/training`);
      setTraining(response.data.data);
    };
    fetchMap();
    fetchResources();
    fetchTraining();
  }, []);

  const data = [
    {
      title: <Badge type="info" message="Available Map" className="text-md" />,
      icon: <FaMapMarkerAlt />,
      analytics: map.length,
    },
    {
      title: <Badge type="info" message="Available Resources" className="text-md" />,
      icon: <FaBook />,
      analytics: resources.length,
    },
    {
      title: <Badge type="info" message="Available Training" className="text-md" />,
      icon: <FaLightbulb />,
      analytics: training.length,
    },
  ];

  return (
    <React.Fragment>
      {data.map((item, index) => (
        <div className="w-full shadow-lg cursor-pointer relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-90 transition-all">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>{item.title}</div>
            <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">{item.icon}</div>
          </div>
          <div className="mt-4">
            <p className="text-pretty text-2xl text-gray-500">{item.analytics}</p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
