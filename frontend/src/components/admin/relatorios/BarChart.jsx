"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ labels, values, title }) {
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
    return <Bar data={data} options={options} />;
}