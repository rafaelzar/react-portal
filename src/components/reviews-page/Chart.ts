export const Chart = (data: Array<number>): Record<string, unknown> => {
  const chartData = {
    labels: ['Facebook', 'Google', 'Yahoo', 'Yelp'],
    datasets: [
      {
        label: 'My First Dataset',
        data,
        backgroundColor: [
          'rgb(97,206,187)',
          'rgb(244,118,96)',
          'rgb(233,175,73)',
          'rgb(151,227,214)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return chartData;
};

