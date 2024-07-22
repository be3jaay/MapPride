import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const CustomTabs = ({ tabs }) => (
  <Tabs>
    <TabList className="bg-indigo-200 text-black">
      {tabs.map((tab, index) => (
        <Tab key={index}>{tab.title}</Tab>
      ))}
    </TabList>
    {tabs.map((tab, index) => (
      <TabPanel key={index}>{tab.content}</TabPanel>
    ))}
  </Tabs>
);
