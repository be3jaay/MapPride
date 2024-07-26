import PropTypes from 'prop-types';

export default function Loading({ type }) {
  const loadingTypes = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    error: 'text-error',
    warning: 'text-warning',
    success: 'text-success',
  };
  return <span className={`loading loading-spinner w-24 h-24 ${loadingTypes[type]}`}></span>;
}

Loading.loadingTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'accent', 'error', 'warning', 'success']).isRequired,
};
