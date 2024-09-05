import React from 'react';
import { ServicesData } from '../../../core/constant';

export const Services = () => {
  return (
    <section id="services" className="w-full  p-36 h-full bg-indigo-50">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center justify-center flex-col">
            <span className="text-4xl text-indigo-700 font-bold mb-4">Services we provide</span>
          </div>
        </div>
        {ServicesData.map((item, index) => (
          <div key={index} className=" flex items-center justify-center ">
            <article className="rounded-xl mb-4 shadow-md bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 ">
              <div className="flex items-start sm:gap-8">
                <div
                  className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-indigo-500"
                  aria-hidden="true"
                >
                  <div className="text-2xl text-indigo-700">{item.icon}</div>
                </div>
                <div>
                  <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 font-medium text-white">
                    {item.title}
                  </strong>

                  <h3 className="mt-4 text-lg font-medium sm:text-xl">
                    <a href="#" className="hover:underline">
                      {item.subTitle}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
