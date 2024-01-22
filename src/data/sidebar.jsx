import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { ImProfile } from 'react-icons/im';

const menu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: 'Profile',
        icon: <CgProfile />,
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        icon: <ImProfile />,
        path: '/edit-profile',
      },
    ],
  },
  {
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
];

export default menu;
