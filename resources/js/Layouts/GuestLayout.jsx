import { Link } from '@inertiajs/react';
import ally from '../../core/images/ally.png';

export default function Guest({ children }) {
  return (
    <div className=" px-10 lg:px-0 min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
      <div>
        <Link href="/">
          <img src={ally} alt="" className="w-20 h-20" />
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 border border-indigo-700/20 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
