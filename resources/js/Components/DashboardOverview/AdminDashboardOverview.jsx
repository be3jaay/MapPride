import { useEffect, useState } from 'react';
import { BarGraph } from '../Chart/Bar';
import { LineGraph } from '../Chart/Line';
import { PieGraph } from '../Chart/Pie';
import { FaUsers, FaUserCheck } from 'react-icons/fa6';
import { BsPostcardHeart } from 'react-icons/bs';
import { IoStarSharp } from 'react-icons/io5';
import { RiChatThreadLine } from 'react-icons/ri';
import axios from 'axios';
import { Badge } from '../Badge';
import { Alert } from '../Alert';

export const AdminDashboardOverview = () => {
  const [user, setUser] = useState([]);
  const [story, setStory] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [highestRatedMap, setHighestRatedMap] = useState(null);
  const [map, setMap] = useState([]);
  const [nonAdminContributions, setNonAdminContributions] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('/api/users/view-all');
      setUser(response.data.data);
    };
    const fetchMap = async () => {
      const response = await axios.get('/api/map');
      const data = response.data.data ?? [];
      const filteredContributions = data.filter(item => item.usertype !== 'admin');
      setMap(data);
      setNonAdminContributions(filteredContributions.length);
    };
    const fetchStory = async () => {
      const response = await axios.get('/api/experience');
      setStory(response.data.data);
    };
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.data);
    };
    const fetchFeedback = async () => {
      const response = await axios.get('/api/feedback');
      const feedbackData = response.data.data;
      setFeedback(feedbackData);
      const totalFeedbackValue = feedbackData.reduce((sum, item) => sum + item.feedback_value, 0);
      const average = totalFeedbackValue / feedbackData.length || 0;
      setAverageRating(average.toFixed(1));
    };

    const fetchHighestRatedMap = async () => {
      try {
        const response = await axios.get('/api/maps/highest-rated');
        if (response.data?.highest_rated_map) {
          const highestRatedMap = response.data.highest_rated_map;
          highestRatedMap.average_rating = parseFloat(highestRatedMap.average_rating).toFixed(2);
          setHighestRatedMap(highestRatedMap);
        }
      } catch (error) {
        console.error('Error fetching highest rated map:', error);
      }
    };

    fetchBlogs();
    fetchStory();
    fetchUser();
    fetchFeedback();
    fetchHighestRatedMap();
    fetchMap();
  }, []);

  return (
    <div className="w-full px-8">
      <div className="flex items-center justify-between gap-2 mt-2">
        <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-indigo-700">Overall Users</p>
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
              <p className="text-lg font-bold text-indigo-700">User Map Contribution</p>
              <p className="text-xl font-medium text-gray-900">{nonAdminContributions}</p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <FaUserCheck />
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
              <p className="text-lg font-bold text-indigo-700">Discussion Posted</p>
              <p className="text-xl font-medium text-gray-900">{blogs.length}</p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <RiChatThreadLine />
            </span>
          </div>
        </article>
        <article className="rounded-lg border border-gray-100 bg-indigo-200 p-6 w-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-indigo-700">Average Rating on App</p>
              <p className="text-xl font-medium text-gray-900 flex items-center">
                {averageRating}
                <IoStarSharp className="ml-1 text-indigo-700" />
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 p-3 text-black text-2xl">
              <IoStarSharp />
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
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full h-[54rem] p-4 flex items-center justify-center ">
          <PieGraph />
        </div>
        <div className="col-span-6 bg-indigo-200 rounded-md  w-full h-auto py-8 px-8 ">
          {highestRatedMap && (
            <div className="w-full">
              <Alert message=" Featured as the highest rated inclusive environment" type="info" />

              <article className="rounded-lg mt-6 w-full flex items-center justify-center">
                <div className="card w-full bg-white flex items-center justify-center">
                  <div className="w-full">
                    <img
                      src={highestRatedMap.image ? highestRatedMap.image : '/path/to/default/image.jpg'}
                      aria-hidden
                      alt="Map Image"
                      className="h-[30rem] w-full"
                    />
                  </div>
                  <div className="w-full card-body shadow-lg relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 ">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div className="w-full">
                        <Badge type="info" message={highestRatedMap.average_rating} className="py-3 px-6">
                          <IoStarSharp className="ml-1 text-indigo-700" />
                        </Badge>
                        <hr className="w-full my-4" />
                      </div>
                    </div>
                    <div className="gap-3">
                      <h3 className=" font-bold text-sm text-gray-700  sm:text-xl">{highestRatedMap.title}</h3>
                      <span className=" text-pretty text-sm text-gray-700 font-bold flex items-center">
                        Address: {highestRatedMap.address}
                      </span>
                      <span className="ext-pretty text-sm text-gray-700 font-bold flex items-center">
                        Available Services: {highestRatedMap.services.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
