import React, { useEffect, useState } from 'react';
import { Badge } from '../Badge';
import { FaMapMarkerAlt, FaLightbulb } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa6';
import axios from 'axios';

export default function UserAnalytics() {
  const [map, setMap] = useState([]);
  const [resources, setResources] = useState([]);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      const response = await axios.get('/api/map');
      setMap(response.data.data);
    };
    const fetchResources = async () => {
      const response = await axios.get('/api/resources');
      setResources(response.data.data);
    };
    const fetchTraining = async () => {
      const response = await axios.get('/api/training');
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
      path: 'map',
    },
    {
      title: <Badge type="info" message="Available Resources" className="text-md" />,
      icon: <FaBook />,
      analytics: resources.length,
      path: 'resources',
    },
    {
      title: <Badge type="info" message="Available Training" className="text-md" />,
      icon: <FaLightbulb />,
      analytics: training.length,
      path: 'training',
    },
  ];

  return (
    <React.Fragment>
      {data.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className="w-full mt-12 shadow-lg cursor-pointer relative block overflow-hidden rounded-lg bg-white border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-95 transition-all"
        >
          <div className=" ">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>{item.title}</div>
              <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">{item.icon}</div>
            </div>
            <div className="mt-4">
              <p className="text-pretty text-2xl text-gray-500">{item.analytics}</p>
            </div>
          </div>
        </a>
      ))}
    </React.Fragment>
  );
}
