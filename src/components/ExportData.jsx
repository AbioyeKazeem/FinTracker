import React from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";

const ExportData = ({ transactions }) => {
    const exportToCSV = () => {
        const headers = "Date,Description,Amount,Type\n";
        const data = transactions.map(transaction => (
            `${transaction.date},${transaction.description},${transaction.amount},${transaction.type}`
        )).join("\n");

        const csvData = headers + data;
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "transaction_history.csv");
        a.click();
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        let yPosition = 10;

        doc.text("Transaction History", 10, yPosition);
        yPosition += 10;

        transactions.forEach(transaction => {
            const line = `${transaction.date} - ${transaction.description} - ₦${transaction.amount} - ${transaction.type}`;
            doc.text(line, 10, yPosition);
            yPosition += 10;
        });

        doc.save("transaction_history.pdf");
    };

    return (
        <div className="mb-3">
            <h5>Export Data</h5>
            <Button variant="primary" onClick={exportToCSV} className="me-2">
                Export as CSV
            </Button>

            <Button variant="secondary" onClick={exportToPDF} className="me-2">
                Export as PDF
            </Button>
        </div>
    );
};

export default ExportData;
