import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { LuBook } from 'react-icons/lu';
import { FaLaptop } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { BsPostcard } from 'react-icons/bs';
import { FaThreads } from 'react-icons/fa6';
import { MdOutlineFeedback } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';

export const AdminHeaderData = [
  {
    title: 'Dashboard',
    path: 'admin.dashboard',
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    title: 'Map Management',
    path: 'admin.map',
    icon: <FiMapPin />,
  },
  {
    title: 'Resource Management',
    path: 'admin.resources',
    icon: <LuBook />,
  },
  {
    title: 'Training Management',
    path: 'admin.training',
    icon: <FaLaptop />,
  },
  {
    title: 'Experience Management',
    path: 'admin.experience',
    icon: <BsPostcard />,
  },
  {
    title: 'Feedback Management',
    path: 'admin.feedback',
    icon: <MdOutlineFeedback />,
  },
  {
    title: 'Support Management',
    path: 'admin.support',
    icon: <MdOutlineSupportAgent />,
  },
  {
    title: 'Hotline Management',
    path: 'admin.hotline',
    icon: <MdOutlineSupportAgent />,
  },
  {
    title: 'Discussion Management',
    path: 'admin.blog',
    icon: <FaThreads />,
  },
  {
    title: 'User Management',
    path: 'admin.user',
    icon: <FaRegUser />,
  },
];
