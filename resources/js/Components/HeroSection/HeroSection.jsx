import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import { Hero } from '../../../core/icons/hero-bg';
import { RoughNotation } from 'react-rough-notation';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="w-full h-full lg:h-screen p-12 lg:p-36 bg-white flex flex-col items-center justify-center"
    >
      <div className="flex flex-col gap-2 mt-14   lg:mt-56 h-auto">
        <div className="w-full flex items-start lg:items-center justify-center flex-col">
          <h1 className="text-6xl text-black font-bold z-0">
            <span className="mr-2 ">Find your</span>
            <RoughNotation type="highlight" show={true} color="#4338CA" animationDuration={2500}>
              <span className="text-white ">Inclusive Environment</span>
            </RoughNotation>
          </h1>
          <p className="text-xl text-gray-500 my-5 max-w-3xl leading-6 text-center">
            In a world where everyone deserves to feel safe and accepted, our platform is dedicated to mapping and
            promoting LGBTQ+-friendly spaces within our community.
          </p>
          <Link href={route('register')}>
            <PrimaryButton className="py-4 w-[20rem] lg:w-40 flex items-center justify-center">
              Get Involved
            </PrimaryButton>
          </Link>
        </div>
      </div>
      <div className="w-full h-full  flex items-center justify-center">
        <Hero />
      </div>
    </section>
  );
};
