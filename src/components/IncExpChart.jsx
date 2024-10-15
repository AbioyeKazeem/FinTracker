import React from "react";
import { Bar } from "react-chartjs-2";
import IncomeExpense from "./IncomeExpense";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const IncomeExpenseChart = ({ income, expense }) => {
    // Log the values of income and expense for debugging
    console.log("Income Data: ", income);
    console.log("Expense Data: ", expense);

    const data = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                label: "Amount",
                data: [income, expense], // income and expense values
                backgroundColor: ["#36A2EB", "#FF6384"],
                borderColor: ["#36A2EB", "#FF6384"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Ensure legend is displayed
                position: "top",
            },
            title: {
                display: true,
                text: "Income vs Expenses",
            },
        },
    };

    return (
        <div>
            <h3>Income vs Expenses Chart</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default IncomeExpenseChart;
