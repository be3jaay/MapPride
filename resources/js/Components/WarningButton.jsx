export default function WarningButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 dark:bg-yellow-400 border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-yellow-500 focus:bg-gray-700 dark:focus:bg-indigo-400 active:bg-gray-900 dark:active:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
