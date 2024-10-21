import { Link, Head } from '@inertiajs/react';
import ally from '../../core/images/ally.png';
import { HeroSection } from '@/Components/HeroSection/HeroSection';
import { AboutSection } from '@/Components/AboutSection/AboutSection';
import { Services } from '@/Components/ServicesSection/Services';
import Footer from '@/Components/FooterSection/Footer';
import { MobileNavigationData, NavigationData } from '../../core/constant/NavigationData/NavigationData';
import { route } from 'ziggy-js';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState, useCallback } from 'react';

export default function Welcome({ auth }) {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const viewNavigation = useCallback(() => {
    setShow(true);
    setToggle(true);
  });

  const closeNavigation = useCallback(() => {
    setShow(false);
  });

  const closeNav = useCallback(() => {
    setShow(false);
  });

  return (
    <React.Fragment>
      <Head title="Welcome" />
      <nav className="z-10 fixed bg-white px-4 lg:px-36 py-3 flex items-center justify-between w-full drop-shadow-md">
        <div className="">
          <img src={ally} alt="" className="w-12 h-12" />
        </div>
        <ul className="hidden text-indigo-700 md:flex items-center justify-end w-full gap-12 font-bold">
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
        <GiHamburgerMenu className="flex md:hidden text-2xl text-indigo-700" onClick={viewNavigation} />
        {show && (
          <div className="bg-indigo-700 h-screen transition-all">
            <div className="fixed top-0 left-0 w-full h-full bg-indigo-700 z-100">
              <div className="flex justify-end p-4">
                <button onClick={closeNavigation} className="text-white text-lg">
                  ✕
                </button>
              </div>
              <div className="flex flex-col items-center justify-center gap-4  bg-indigo-700 h-screen">
                {MobileNavigationData.map(item => (
                  <a key={item.id} href={item.path} className="text-white " onClick={closeNav}>
                    {item.title}
                  </a>
                ))}
                {auth.user ? (
                  <Link href={route('dashboard')} className="text-white ">
                    Dashboard
                  </Link>
                ) : (
                  <Link href={route('login')}>
                    <button className="text-white ">Login</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      <HeroSection />
      <AboutSection />
      <Services />
      <Footer />
    </React.Fragment>
  );
}
