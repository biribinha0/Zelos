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
        animation: {
            duration: 1000,
            easing: "easeOutQuart"
        },
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: title
            }
        }
    };
    return <Bar ref={ref} data={data} options={options} redraw />;
});

export default BarChart;
