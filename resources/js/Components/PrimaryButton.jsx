import React from 'react';

export default function PrimaryButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
}) {
  return (
    <button
      onClick={onClick}
      className={`btn bg-indigo-700 hover:bg-indigo-800 text-white btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
