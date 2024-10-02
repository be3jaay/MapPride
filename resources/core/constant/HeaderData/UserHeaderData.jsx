import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { LuBook } from 'react-icons/lu';
import { FaLaptop } from 'react-icons/fa';
import { MdOutlineSupportAgent, MdOutlineFeedback } from 'react-icons/md';
import { BsPostcard } from 'react-icons/bs';
import { FaThreads } from 'react-icons/fa6';

export const UserHeaderData = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    title: 'View Map',
    path: 'map',
    icon: <FiMapPin />,
  },
  {
    title: 'View Resources',
    path: 'resources',
    icon: <LuBook />,
  },
  {
    title: 'Training Platform',
    path: 'training',
    icon: <FaLaptop />,
  },
  {
    title: 'Support Assistance',
    path: 'support',
    icon: <MdOutlineSupportAgent />,
  },
  {
    title: 'View Story',
    path: 'experience',
    icon: <BsPostcard />,
  },
  {
    title: 'Community Discussion',
    path: 'thread',
    icon: <FaThreads />,
  },
  {
    title: 'Add Feedback',
    path: 'feedback',
    icon: <MdOutlineFeedback />,
  },
];
