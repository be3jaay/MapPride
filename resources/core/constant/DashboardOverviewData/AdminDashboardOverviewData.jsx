import { FaUsers } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa';
import { MdOutlinePinDrop } from 'react-icons/md';
import { BsPostcardHeart } from 'react-icons/bs';

export const AdminDashboardOverviewData = [
  {
    title: 'Total Users',
    stats: 10,
    icon: <FaUsers />,
  },
  {
    title: 'Ratings',
    stats: 10,
    icon: <FaRegStar />,
  },
  {
    title: 'Experience Posted',
    stats: 10,
    icon: <BsPostcardHeart />,
  },
  {
    title: 'Most Liked Location',
    stats: 10,
    icon: <MdOutlinePinDrop />,
  },
];
