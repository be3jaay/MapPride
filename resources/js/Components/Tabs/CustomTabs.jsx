import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

export const CustomTabs = ({ tabs }) => (
  <Tab.Group>
    <Tab.List className="flex flex-wrap gap-2 p-1 bg-indigo-700 rounded-xl">
      {tabs.map((tab, index) => (
        <Tab as={Fragment} key={index}>
          {({ selected }) => (
            <button
              className={`
                flex-1 min-w-[120px] py-2.5 px-3
                text-sm leading-5 font-medium
                rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400
                transition-all duration-200
                ${selected ? 'bg-white text-indigo-700 shadow' : 'text-white hover:bg-white/[0.12] hover:text-white'}
              `}
            >
              {tab.title}
            </button>
          )}
        </Tab>
      ))}
    </Tab.List>
    <Tab.Panels className="mt-4">
      {tabs.map((tab, index) => (
        <Tab.Panel key={index} className="rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400">
          {tab.content}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
);
