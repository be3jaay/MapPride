import PropTypes from 'prop-types';

export const Badge = ({ message, type }) => {
  const badgeTypes = {
    error: 'border-red-500 bg-red-50 text-red-800',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    info: 'border-indigo-500 bg-indigo-50 text-indigo-800',
    success: 'border-green-500 bg-green-50 text-green-800',
  };

  return (
    <div role="badge" className={`badge ${badgeTypes[type]}`}>
      <strong className="block text-center text-black">{message}</strong>
    </div>
  );
};

Badge.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
};
