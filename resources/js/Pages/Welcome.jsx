import { Link, Head } from '@inertiajs/react';
import ally from '../../core/images/ally.png';
import { HeroSection } from '@/Components/HeroSection/HeroSection';
import { AboutSection } from '@/Components/AboutSection/AboutSection';
import { ContactSection } from '@/Components/ContactSection/ContactSection';
import { Services } from '@/Components/ServicesSection/Services';
import Footer from '@/Components/FooterSection/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <Head title="Welcome" />

      <nav className="z-10 fixed bg-white px-36 py-3 flex items-center justify-between w-full drop-shadow-md">
        <div className="">
          <img src={ally} alt="" className="w-12 h-12" />
        </div>
        <ul className="text-indigo-700 flex items-center justify-center gap-12 font-bold">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact"> Contact</a>
          <a href="#services">Services</a>
        </ul>
        <div className="">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="btn w-24 bg-transparent text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white"
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
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <Services />
      <Footer />
    </>
  );
}
