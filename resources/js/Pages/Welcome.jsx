import { Link, Head } from '@inertiajs/react';
import bgHero from '../../core/images/bgHero.png';
import { FaArrowRightLong } from 'react-icons/fa6';
import PrimaryButton from '@/Components/PrimaryButton';
import ally from '../../core/images/ally.png';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <Head title="Welcome" />

      <nav className="bg-white absolute px-36 py-6 flex items-center justify-between w-full drop-shadow-md">
        <div className="">
          <img src={ally} alt="" className="w-14 h-14" />
        </div>
        <ul className="text-indigo-700 flex items-center justify-center gap-12 font-bold">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Services</li>
        </ul>
        <div className="">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href={route('login')}>
                <button className="btn w-24 bg-transparent text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="w-full h-screen p-36 bg-white">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h1 className="text-8xl text-black font-bold">
              Empowering <span className="text-indigo-700">Safe Spaces</span> for Everyone
            </h1>
            <p className="text-xl text-gray-500 my-5 max-w-3xl leading-6">
              In a world where everyone deserves to feel safe and accepted, our platform is dedicated to mapping and
              promoting LGBTQ+-friendly spaces within our community.
            </p>
            <Link href={route('register')}>
              <PrimaryButton className="py-4 w-40 flex items-center justify-center">
                Register here <FaArrowRightLong className="ml-2" />
              </PrimaryButton>
            </Link>
          </div>
          <div className="">
            <img src={bgHero} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
