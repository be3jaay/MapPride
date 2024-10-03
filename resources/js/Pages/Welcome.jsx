import { Link, Head } from '@inertiajs/react';
import ally from '../../core/images/ally.png';
import { HeroSection } from '@/Components/HeroSection/HeroSection';
import { AboutSection } from '@/Components/AboutSection/AboutSection';
import { Services } from '@/Components/ServicesSection/Services';
import Footer from '@/Components/FooterSection/Footer';
import { NavigationData } from '../../core/constant/NavigationData/NavigationData';
import { route } from 'ziggy-js';
import { GiHamburgerMenu } from 'react-icons/gi';
import React from 'react';

export default function Welcome({ auth }) {
  return (
    <React.Fragment>
      <Head title="Welcome" />
      <nav className="z-10 fixed bg-white px-4 lg:px-36 py-3 flex items-center justify-between w-full drop-shadow-md">
        <div className="">
          <img src={ally} alt="" className="w-12 h-12" />
        </div>
        <ul className="hidden text-indigo-700 md:flex items-center justify-between w-full gap-12 font-bold">
          <div className="flex items-center justify-center gap-12 md:ml-40 lg:ml-72">
            {NavigationData.map(item => (
              <a key={item.id} href={item.path} className="">
                {item.title}
              </a>
            ))}
          </div>

          <div className="">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="btn w-24 bg-transparent text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white"
              >
                Dashboard
              </Link>
            ) : (
              <Link href={route('login')}>
                <button className="btn w-24 bg-transparent text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white">
                  Login
                </button>
              </Link>
            )}
          </div>
        </ul>
        <GiHamburgerMenu className="flex md:hidden" />
      </nav>
      <HeroSection />
      <AboutSection />
      <Services />
      <Footer />
    </React.Fragment>
  );
}
