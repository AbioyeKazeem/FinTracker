import React, { useState } from "react";

const SpendingTrends = ({ transactions }) => {
  const [period, setPeriod] = useState("monthly");

  const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date();
    let filteredTransactions = [];

    if (period === "weekly") {
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      filteredTransactions = transactions.filter(
        (transaction) => new Date(transaction.date) >= oneWeekAgo);
    } 
    else if (period === "monthly") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); 
      filteredTransactions = transactions.filter(
        (transaction) => new Date(transaction.date) >= oneMonthAgo
      );
    } 
    else if (period === "yearly") {
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      filteredTransactions = transactions.filter(
        (transaction) => new Date(transaction.date) >= oneYearAgo
      );
    }

    return filteredTransactions;
  };

  const filteredTransactions = filterTransactionsByPeriod(transactions, period);

  const incomeTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "income"
  );

  const expenseTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const totalExpense = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div>
      <h5>Spending Trends</h5>
      <div>
        <label>Select Period:</label>
        <select value={period} onChange={(event) => setPeriod(event.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <p>Total Income for {period}: ₦{totalIncome.toFixed(2)}</p>
        <p>Total Expenses for {period}: ₦{totalExpense.toFixed(2)}</p>
        <p>Net Spending for {period}: ₦{(totalIncome - totalExpense).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SpendingTrends;
