"use client";

import { forwardRef } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = forwardRef(({ labels, values, title }, ref) => {
    const data = {
        labels,
        datasets: [
            {
                label: "Total",
                data: values,
                backgroundColor: "rgba(154, 25, 21, 0.75)"
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: title }
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,     // não deixa inclinar
                    minRotation: 0
                }
            }
        }
    };

    return <div style={{ height: "400px" }}>
        <Bar ref={ref} data={data} options={options} redraw />
    </div>

});

export default BarChart;
