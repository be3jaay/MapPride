import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { pieChartData } from './ChartData';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieGraph = () => {
  const options = {};

  return <Pie options={options} data={pieChartData} />;
};
