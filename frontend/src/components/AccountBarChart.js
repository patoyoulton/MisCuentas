import React from 'react';
import { Bar } from 'react-chartjs-2';

const AccountBarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Balance por Cuenta',
        data: data.values,
        backgroundColor: 'green',
      }
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: 'Cuentas' } },
      y: { title: { display: true, text: 'Balance ($)' } }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default AccountBarChart;
