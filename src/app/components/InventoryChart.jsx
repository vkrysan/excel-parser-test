'use client';

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
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale, 
  LinearScale,   
  PointElement,  
  LineElement,   
  Title,         
  Tooltip,       
  Legend         
);

export default function InventoryChart({ data }) {
 
  if (!data || data.length === 0) {
    return <p>Нет данных для отображения.</p>;
  }


  
  
  const statusCounts = data.reduce((acc, item) => {
    if (item.Status) {
      acc[item.Status] = (acc[item.Status] || 0) + 1;
      
      
    }
    return acc;
  }, {});

//   console.log('Status counts:', statusCounts);

  
  const chartData = {
    labels: Object.keys(statusCounts), 
    datasets: [
      {
        label: 'Количество товаров по статусу',
        data: Object.values(statusCounts), 
        fill: false, 
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1, 
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)', 
        pointRadius: 4, 
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
