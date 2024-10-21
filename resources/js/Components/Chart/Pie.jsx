import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieGraph = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/users/view-all');
      setPieData(response.data.data);
    };
    fetchData();
  }, []);

  const filterGender = () => {
    const counts = pieData.reduce((acc, item) => {
      const gender = item.gender.toUpperCase();
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a) // Sort by count descending
      .map(([gender]) => gender); // Extract the types
  };

  const options = {};

  const pieChartData = {
    labels: filterGender(),
    datasets: [
      {
        data: filterGender().map(gender => pieData.filter(item => item.gender.toUpperCase() === gender).length),
        backgroundColor: [
          '#264653',
          '#ffbe0b',
          '#14213d',
          '#99582a',
          '#9e0059',
          '#7209b7',
          '#800e13',
          '#252422',
          '#f2e8cf',
          '#3d405b',
          '#ffbe0b',
          '#15616d',
          '#ffc2d1',
          '#f4a261',
          '#003049',
          '#dad7cd',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie options={options} data={pieChartData} />;
};
