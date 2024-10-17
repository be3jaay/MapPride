import React, { useEffect, useState } from 'react';
import { Badge } from '../Badge';
import axios from 'axios';
import { GoCommentDiscussion, GoBook, GoLightBulb } from 'react-icons/go';

export default function UserAnalytics() {
  const [blog, setBlog] = useState([]);
  const [resources, setResources] = useState([]);
  const [training, setTraining] = useState([]);

  useEffect(() => {
    const fetchMap = async () => {
      const response = await axios.get('api/blogs');
      setBlog(response.data.data);
    };
    const fetchResources = async () => {
      const response = await axios.get('/api/resources/view-all');
      setResources(response.data.data);
    };
    const fetchTraining = async () => {
      const response = await axios.get('/api/training/view-all');
      setTraining(response.data.data);
    };
    fetchMap();
    fetchResources();
    fetchTraining();
  }, []);

  const data = [
    {
      title: <Badge type="info" message="Community Discussion" className="text-md" />,
      icon: <GoCommentDiscussion />,
      analytics: blog.length,
      path: 'thread',
    },
    {
      title: <Badge type="info" message="Available Resources" className="text-md" />,
      icon: <GoBook />,
      analytics: resources.length,
      path: 'resources',
    },
    {
      title: <Badge type="info" message="Available Training" className="text-md" />,
      icon: <GoLightBulb />,
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
          className="w-full mt-4 shadow-lg cursor-pointer relative block overflow-hidden rounded-lg bg-white border border-gray-100 p-4 sm:p-6 lg:p-8 hover:scale-95 transition-all"
        >
          <div className=" ">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>{item.title}</div>
              <div className="hidden sm:block sm:shrink-0 text-3xl text-indigo-700">{item.icon}</div>
            </div>
            <span></span>
            <div className="mt-4">
              <p className="text-pretty text-2xl text-gray-500">{item.analytics}</p>
            </div>
          </div>
        </a>
      ))}
    </React.Fragment>
  );
}
