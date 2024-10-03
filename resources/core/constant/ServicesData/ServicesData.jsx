import { GrMap } from 'react-icons/gr';
import { FaRegLightbulb } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import React from 'react';

const data = [
  {
    icon: <GrMap />,
    title: 'Mapping',
    subTitle: 'Sub title',
    description:
      'The platform includes an interactive map feature that displays safe spaces across various locations. Users can easily discover and connect with inclusive:',
    subDescription1: 'Safe Spaces',
    subDescription2: 'Healthcare Facilities',
    subDescription3: 'Government Services',
    subDescription4: 'Support Association',
  },
  {
    icon: <MdOutlineLibraryBooks />,
    title: 'Resources',
    subTitle: 'Sub title',
    description: 'A comprehensive resources hub offers access to:',
    subDescription1: 'LGBTQ+ Rights Information',
    subDescription2: 'Mental Health Support',
    subDescription3: 'Social Services',
  },
  {
    icon: <FaRegLightbulb />,
    title: 'Training',
    subTitle: 'Sub title',
    description:
      'The training platform provides educational opportunities to enhance personal and professional growth. It offers:',
    subDescription1: 'Online Courses & Workshops',
    subDescription2: 'Free Certification Programs',
  },
];

export const ServicesData = () => {
  return (
    <React.Fragment>
      {data?.map(item => (
        <div key={item.id} className=" w-full flex items-center justify-center ">
          <article className="w-full rounded-xl mb-4 shadow-md bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 ">
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

                <h3 className="mt-4 text-lg font-bold sm:text-xl">
                  <span className="">{item.description}</span>
                </h3>
                <ol className="px-4 py-3">
                  <li className="mt-1 text-md text-gray-700">{item.subDescription2}</li>
                  <li className="mt-1 text-md text-gray-700">{item.subDescription3}</li>
                  <li className="mt-1 text-md text-gray-700">{item.subDescription4}</li>
                  <li className="mt-1 text-md text-gray-700">{item.subDescription1}</li>
                </ol>
              </div>
            </div>
          </article>
        </div>
      ))}
    </React.Fragment>
  );
};
