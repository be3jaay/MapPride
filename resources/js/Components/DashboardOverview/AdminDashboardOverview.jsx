import { useEffect, useState } from 'react';
import { BarGraph } from '../Chart/Bar';
import { LineGraph } from '../Chart/Line';
import { PieGraph } from '../Chart/Pie';
import { FaUsers } from 'react-icons/fa6';
import { BsPostcardHeart } from 'react-icons/bs';
import { MdOutlinePinDrop } from 'react-icons/md';
import { IoStarSharp } from 'react-icons/io5';

export const AdminDashboardOverview = () => {
  const [user, setUser] = useState([]);
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/users');
      setUser(response.data.data);
    };
    const fetchStory = async () => {
      const response = await axios.get('/api/experience');
      setStory(response.data.data);
    };
    fetchStory();
    fetchUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-2 mt-2">
        <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-indigo-700">Total Users</p>
              <p className="text-xl font-medium text-gray-900">{user.length}</p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <FaUsers />
            </span>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-indigo-700">Story Posted</p>
              <p className="text-xl font-medium text-gray-900">{story.length}</p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <BsPostcardHeart />
            </span>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-indigo-700">Average Rating on Application</p>
              <p className="text-xl font-medium text-gray-900 flex items-center">
                {story.length}
                <IoStarSharp className="ml-1 text-indigo-700" />
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <MdOutlinePinDrop />
            </span>
          </div>
        </article>
      </div>

      <div className="grid grid-cols-12 gap-2 mt-4 w-full h-full ">
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full p-4 ">
          <BarGraph />
        </div>
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full p-4 ">
          <LineGraph />
        </div>
        <div className="col-span-12 bg-indigo-200 rounded-md  w-full h-[32rem] p-4 flex items-center justify-center ">
          <PieGraph />
        </div>
      </div>
    </div>
  );
};
