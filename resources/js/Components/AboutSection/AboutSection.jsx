import React from 'react';
import about from '../../../core/images/about.png';

export const AboutSection = () => {
  return (
    <section id="about" className="w-full h-full bg-indigo-50">
      <div className="p-36">
        <div className="flex flex-col"></div>
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center justify-center flex-col">
            <span className="text-xl text-indigo-700 font-bold">Contributors</span>
            <h1 className="text-6xl font-bold text-black">Meet our team</h1>
            <p className="text-2xl text-gray-500 my-5 max-w-3xl leading-6">
              “We suffer more often in imagination than in reality.” ~ Seneca
            </p>
          </div>
        </div>
        ``
        <div className="flex w-full items-center justify-around">
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={about} alt="" />
            <span className="text-black font-bold text-2xl">Brian James Dela Cruz</span>
            <span className="text-indigo-700 text-xl">Software Engineer</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={about} alt="" />
            <span className="text-black font-bold text-2xl">Lade Ausstine Millera</span>
            <span className="text-indigo-700 text-xl">Research Head</span>
          </div>
        </div>
      </div>
    </section>
  );
};
