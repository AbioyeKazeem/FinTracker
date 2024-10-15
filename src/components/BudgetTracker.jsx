import React from "react";
import { ProgressBar } from "react-bootstrap";

function BudgetTracker ({ monthlyBudget, expenseTransactions }){
   // console.log(expenseTransactions);
    const totalExpenses = Array.isArray(expenseTransactions)? expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0): 0;
    const budgetUsed = (totalExpenses / monthlyBudget) * 100;
    return (
        <div className="budget-tracker">
            <h6>Monthly Budget: ₦{monthlyBudget.toLocaleString()}</h6>
            
           <p>Total Expenses: ₦{totalExpenses.toLocaleString()}</p> 
            <ProgressBar
                now={budgetUsed}
                label={`₦{Math.round(budgetUsed)}%`}
                variant={budgetUsed > 100 ? "danger" : "success"}
            />
            {budgetUsed > 100 && <p style={{ color: "red" }}>You have exceeded your budget!</p>}
        </div>
    );
};

export default BudgetTracker;
