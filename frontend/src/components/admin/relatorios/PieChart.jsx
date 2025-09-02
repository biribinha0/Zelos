"use client";

import { forwardRef } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = forwardRef(({ labels, values, title }, ref) => {
    const data = {
        labels,
        datasets: [{
            data: values,
            backgroundColor: [
                "rgba(255, 87, 51, 0.75)",   // vermelho/laranja para pendente
                "rgba(255, 206, 86, 0.75)",  // amarelo para em andamento
                "rgba(40, 167, 69, 0.75)",   // verde para concluído
                "rgba(54, 162, 235, 0.75)",  // azul para outro status
                "rgba(155, 89, 182, 0.75)"   // roxo para outro status
            ]
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (
        <div style={{ height: "350px" }}>
            <Pie ref={ref} data={data} options={options} />
        </div>
    );
});

export default PieChart;
