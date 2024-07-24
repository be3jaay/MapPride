import PropTypes from 'prop-types';
import { MdErrorOutline } from 'react-icons/md';
import { IoWarningOutline } from 'react-icons/io5';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

export const Alert = ({ message, description, type }) => {
  const alertStyles = {
    error: 'border-red-500 bg-red-50 text-red-800',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    info: 'border-indigo-500 bg-indigo-50 text-indigo-800',
    success: 'border-green-500 bg-green-50 text-green-800',
  };

  const iconPaths = {
    error: <MdErrorOutline className="h-5 w-5" />,
    warning: <IoWarningOutline className="h-5 w-5" />,
    info: <IoMdInformationCircleOutline className="h-5 w-5" />,
    success: <IoIosCheckmarkCircleOutline className="h-5 w-5" />,
  };

  return (
    <div role="alert" className={`rounded border-s-4 p-4 ${alertStyles[type]}`}>
      <div className="flex items-center gap-2">
        {iconPaths[type]}
        <strong className="block font-bold">{message}</strong>
      </div>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
};

Alert.defaultProps = {
  description: '',
};
