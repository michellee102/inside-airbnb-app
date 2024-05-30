// import React from 'react';
// import { Chart as ChartJS, Title, Tooltip, DoughnutController, ArcElement, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(Title, Tooltip, DoughnutController, ArcElement, Legend);

// function generateRandomColor() {
//     // Generate a random color in hexadecimal format
//     return '#' + Math.floor(Math.random() * 16777215).toString(16);
// }

// function DoughnutChart({ labels, dataValues, title }) {
//     const numLabels = labels.length;
//     const colorPalette = Array.from({ length: numLabels }, () => generateRandomColor());

//     const data = {
//         labels,
//         datasets: [
//             {
//                 data: dataValues,
//                 backgroundColor: colorPalette,
//                 borderWidth: 0.5,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             title: {
//                 display: true,
//                 text: title
//             },
//             legend: {
//                 display: true,
//                 position: 'top', // You can adjust the position as per your preference
//             },
//         },
//     };

//     return (
//         <div className="w-100 h-100">
//             <Doughnut data={data} options={options} />
//         </div>
//     );
// }

// export default DoughnutChart;
