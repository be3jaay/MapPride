import ally from '../../../core/images/ally.png';
import { FaChevronUp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-indigo-700 p-2 text-white shadow transition hover:bg-indigo-900 sm:p-3 lg:p-4"
            href="#MainContent"
          >
            <span className="sr-only">Back to top</span>
            <FaChevronUp />
          </a>
        </div>

        <div className=" lg:flex lg:items-end lg:justify-between">
          <div className="flex items-center flex-col justify-center lg:flex lg:items-start">
            <img src={ally} alt="" className="w-12 h-12" />
            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum itaque
              neque.
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <p className="w-full flex mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2024. All rights reserved. | Developed by :
          <span className="text-indigo-700 font-bold ">Brian James L. Dela Cruz</span>
        </p>
      </div>
    </footer>
  );
}
