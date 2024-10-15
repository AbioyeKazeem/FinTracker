import React from "react";

function NetworthTracker({transactions}){
    const totalIncome = transactions
    .filter(transaction =>transaction.type==="income")
    .reduce((acc,transaction)=> acc+ transaction.amount,0);

    const totalExpenses = transactions
    .filter(transaction => transaction.type==="expense")
    .reduce((acc,transaction)=> acc + transaction.amount,0);

    const netWorth = totalIncome - totalExpenses
    return( 
        <div>
        <h5>Net Worth</h5>
        <p>Your current Net Worth is:<strong>₦{netWorth.toFixed(2)}</strong></p>
        </div>
    )
}
export default NetworthTracker;