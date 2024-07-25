export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={
        `inline-flex items-center px-4 py-2 bg-transparen dark:text-black border border-black  rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
