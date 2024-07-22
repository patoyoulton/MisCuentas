import React from 'react';
import { Line } from 'react-chartjs-2';

const WealthOverviewChart = ({ data, filter }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: `Riqueza General (${filter})`,
        data: data.values,
        fill: false,
        borderColor: 'purple',
      }
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Periodo' } },
      y: { title: { display: true, text: 'Riqueza ($)' } }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default WealthOverviewChart;
