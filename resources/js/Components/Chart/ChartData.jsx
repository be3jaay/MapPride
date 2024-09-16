//DATA ANALYTICS HERE
export const lineChartData = {
  labels: ['MOCK', 'MOCK', 'MOCK'],
  datasets: [
    {
      label: 'Brigada',
      data: [20, 15, 30],
      borderColor: 'indigo',
    },
    {
      label: 'Training',
      data: [50, 23, 10],
      borderColor: 'blue',
    },
    {
      label: 'Workforce',
      data: [31, 3, 5],
      borderColor: 'black',
    },
  ],
};
export const barChartData = {
  labels: ['Harassment', 'Bullying', 'Discrimination'],
  datasets: [
    {
      label: 'Commonly Type of discrimination LGBTQ+ faces',
      data: [20, 15, 30],
      borderColor: 'indigo',
      backgroundColor: 'indigo',
    },
  ],
};

export const pieChartData = {
  labels: ['Gay', 'Lesbian', 'Bisexual', 'Transgender'],
  datasets: [
    {
      label: ['Gay', 'Lesbian', 'Bisexual', 'Transgender'],
      data: [20, 40, 23, 12],
      backgroundColor: ['indigo', 'lime', 'blue', 'black'],
      hoverOffset: 4,
    },
  ],
};
