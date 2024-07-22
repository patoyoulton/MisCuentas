import React from 'react';
import { Line } from 'react-chartjs-2';

const BalanceLineChart = ({ data, previousMonthData }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Balance Actual',
        data: data.values,
        fill: false,
        borderColor: 'blue',
      },
      {
        label: 'Balance Mes Anterior',
        data: previousMonthData.values,
        fill: false,
        borderColor: 'red',
        borderDash: [5, 5],
      }
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Fecha' } },
      y: { title: { display: true, text: 'Balance ($)' } }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default BalanceLineChart;
