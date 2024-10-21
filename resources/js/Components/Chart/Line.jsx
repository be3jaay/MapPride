import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineGraph = () => {
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      const response = await axios.get('/api/experience/view-all');
      setLineData(response.data);
    };
    fetchStory();
  }, []);

  // Process data to count occurrences of each location
  const filterLocationCounts = () => {
    const counts = lineData.reduce((acc, item) => {
      const location = item.location.toUpperCase();
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a) // Sort by count descending
      .map(([location, count]) => ({ location, count })); // Extract locations and counts
  };

  const locationCounts = filterLocationCounts();

  const lineChartData = {
    labels: locationCounts.map(({ location }) => location), // Use locations as labels
    datasets: [
      {
        label: 'User experiences on different location based on their story.',
        data: locationCounts.map(({ count }) => count), // Use counts for data points
        borderColor: 'indigo',
        fill: false, // Do not fill under the line
        tension: 0.1, // Smooth curve
        pointRadius: 5, // Size of points on the line
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Locations',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Counts',
        },
        beginAtZero: true, // Start y-axis from zero
      },
    },
  };

  return <Line options={options} data={lineChartData} />;
};
