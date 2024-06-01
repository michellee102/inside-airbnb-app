import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function BarChart({ labels, dataValues, title, xTitle, yTitle, dollarSignTooltip, xAxisLabelSize }) {
    const color = 'rgba(75, 192, 192, 0.9)'; // Specify the color for all bars

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: Array(dataValues.length).fill(color), // Use the same color for all bars
                borderWidth: 1.5,
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
                display: false, // Correctly placed legend configuration
            },
        },

        scales: {
            x: {
                title: {
                    display: true,
                    text: xTitle,
                    font: {
                        weight: 'bold',
                    },
                },
                ticks: {
                    font: {
                        size: xAxisLabelSize, // Adjust the size of x-axis labels
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: yTitle,
                    font: {
                        weight: 'bold',
                    },
                },
            },
        },
    };

    if (dollarSignTooltip) {
        options.plugins.tooltip = {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += '$' + formatMoney(context.parsed.y);
                    return label;
                }
            }
        };
    }

    return (
        <div className="w-100 h-100">
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;
