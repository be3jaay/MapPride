import React from 'react';

export default function GhostButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'ghost',
  size = 'md',
}) {
  return (
    <button
      onClick={onClick}
      className={`btn bg-white hover:bg-gray-100 text-black border border-black btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
