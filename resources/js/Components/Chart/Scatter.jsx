import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const ScatterGraph = () => {
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get('/api/experience');
      setScatterData(response.data.data);
    };
    fetchStory();
  }, []);

  const filterLocation = () => {
    const counts = scatterData.reduce((acc, item) => {
      const location = item.location.toUpperCase();
      acc[location] = (acc[location] || 0) + 1; // Count occurrences
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a) // Sort by count descending
      .map(([location]) => location); // Extract the locations
  };

  const scatterChartData = {
    datasets: [
      {
        label: 'Location Distribution',
        data: filterLocation().map((location, index) => ({
          x: index + 1, // Use index as x-value for distribution
          y: scatterData.filter(item => item.location.toUpperCase() === location).length, // Count as y-value
          location: location, // Store location for reference
        })),
        backgroundColor: '#264653',
        pointRadius: 5, // Size of points
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Location Index',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return <Scatter options={options} data={scatterChartData} />;
};
