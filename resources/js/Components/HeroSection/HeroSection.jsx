import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import { Hero } from '../../../core/icons/hero-bg';
import { RoughNotation } from 'react-rough-notation';
import { route } from 'ziggy-js';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="w-full h-full lg:h-screen p-12 lg:p-36 bg-white flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-2 mt-14   lg:mt-56 h-auto">
        <div className="w-full flex items-center lg:items-center justify-center flex-col">
          <RoughNotation type="highlight" show color="#4338CA" animationDuration={2500}>
            <h1 className="text-xl md:text-4xl lg:text-6xl text-white font-bold z-0">
              <span className="mr-2">Find your</span>
              <span className="text-white ">Inclusive Environment</span>
            </h1>
          </RoughNotation>

          <p className="text-md md:text-lg text-gray-500 my-5 max-w-3xl leading-6 text-center">
            In a world where everyone deserves to feel safe and accepted, our platform is dedicated to mapping and
            promoting LGBTQ+-friendly spaces within our community.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col-reverse items-center justify-center md:flex-col">
        <Link href={route('register')} className="w-full md:w-[20rem] flex items-center justify-center">
          <PrimaryButton className="py-4 w-full md:w-[20rem] flex items-center justify-center">
            Get Involved
          </PrimaryButton>
        </Link>
        <div className="w-full h-full  flex items-center justify-center">
          <Hero />
        </div>
      </div>
    </section>
  );
};
