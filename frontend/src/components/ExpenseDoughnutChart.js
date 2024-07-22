// expenseDoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ExpenseDoughnutChart = ({ data }) => {
  console.log('ExpenseDoughnutChart data:', data);

  if (!data || !data.labels || !data.values) {
    console.error('Invalid data for ExpenseDoughnutChart:', data);
    return <div>Error en los datos del gráfico</div>;
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Gastos por Categoría',
        data: data.values,
        backgroundColor: data.colors,
      }
    ],
  };

  return <Doughnut data={chartData} />;
};

export default ExpenseDoughnutChart;
