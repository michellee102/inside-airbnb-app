import React from 'react';
import { Chart as ChartJS, Title, Tooltip, DoughnutController, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, DoughnutController, ArcElement, Legend);

function getColorBasedOnValue(value) {
    if (value > 3.5) {
        return '#8fb935';
    } else if (value > 2.5) {
        return '#e09c3b';
    } else {
        return '#e64747';
    }
}

function DoughnutChart({ labels, dataValues, title }) {
    const colorPalette = dataValues.map(getColorBasedOnValue);

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: colorPalette,
                borderWidth: 0
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title
            },
            legend: {
                display: true,
                position: 'top', // Change position to 'bottom'
                labels: {
                    generateLabels: (chart) => {
                        const { data } = chart;
                        return [
                            {
                                text: '> 3.5 (Good)',
                                fillStyle: '#8fb935',
                                strokeStyle: '#8fb935',
                                lineWidth: 0,
                            },
                            {
                                text: '2.5 - 3.5 (Fair)',
                                fillStyle: '#e09c3b',
                                strokeStyle: '#e09c3b',
                                lineWidth: 0,
                            },
                            {
                                text: '<= 2.5 (Poor)',
                                fillStyle: '#e64747',
                                strokeStyle: '#e64747',
                                lineWidth: 0,
                            },
                        ];
                    },
                },
            },
        },
    };

    return (
        <div className="w-100 h-100 mb-4">
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DoughnutChart;
