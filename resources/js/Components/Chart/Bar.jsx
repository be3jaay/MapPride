import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarGraph = () => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get('/api/experience');
      setBarData(response.data.data);
    };
    fetchStory();
  }, []);

  // Process barData to get the top 3 experience types
  const processedData = () => {
    const counts = barData.reduce((acc, item) => {
      const type = item.experience_type.toUpperCase();
      acc[type] = (acc[type] || 0) + 1; // Count occurrences
      return acc;
    }, {});

    // Sort and get the top 3
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a) // Sort by count descending
      .slice(0, 3) // Get top 3
      .map(([type]) => type); // Extract the types
  };

  const barChartData = {
    labels: processedData(), // Use processed data for labels
    datasets: [
      {
        label: 'Based on shared story LGBTQ+ commonly experience',
        data: processedData().map(type => barData.filter(item => item.experience_type.toUpperCase() === type).length), // Count occurrences for data
        borderColor: '#f3f3f3',
        backgroundColor: ['#f72585', '#3a0ca3', '#57cc99'],
      },
    ],
  };
  const options = {};

  return <Bar options={options} data={barChartData} />;
};
