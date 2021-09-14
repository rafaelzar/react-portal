export const Chart = (data: Array<number>, sites?: Array<string>): Record<string, unknown> => {
  const chartData = {
    labels: sites || ['Weedmaps', 'Google', 'Eyerate'],
    datasets: [
      {
        label: 'My First Dataset',
        data,
        backgroundColor: [
          'rgb(97,206,187)',
          'rgb(244,118,96)',
          'rgb(231,168,55)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return chartData;
};

