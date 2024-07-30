export default function GhostButton({ type = 'button', className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-white dark:hover:bg-indigo-200 dark:hover:text-black dark:text-black border border-black  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
