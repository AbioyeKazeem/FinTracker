import React, { useState } from "react";

const DebtTracker = () => {
    const [debts, setDebts] = useState([]);
    const [debtInput, setDebtInput] = useState({
        creditor: '',
        amount: '',
        dueDate: '',
        status: 'unpaid'
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setDebtInput({ ...debtInput, [name]: value });
    };

    const addDebt = () => {
        setDebts([...debts, { ...debtInput, amount: parseFloat(debtInput.amount) }]);
        setDebtInput({ creditor: "", amount: "", dueDate: "", status: "unpaid" }); // Corrected "upaid" to "unpaid"
    };

    const toggleDebtStatus = (index) => {
        const updatedDebts = debts.map((debt, i) =>
            i === index ? { ...debt, status: debt.status === "unpaid" ? "paid" : "unpaid" } : debt
        );
        setDebts(updatedDebts);
    };

    const totalOutstandingDebt = debts
        .filter(debt => debt.status === "unpaid")
        .reduce((total, debt) => total + debt.amount, 0);

    const totalPaidDebt = debts
        .filter(debt => debt.status === "paid")
        .reduce((total, debt) => total + debt.amount, 0);

    return (
        <div>
            <h5>Debt Tracker</h5>
            <div>
                <input type="text" name="creditor" placeholder="Creditor" value={debtInput.creditor} onChange={handleInput} />
                <input type="number" name="amount" placeholder="Amount" value={debtInput.amount} onChange={handleInput} />
                <input type="date" name="dueDate" value={debtInput.dueDate} onChange={handleInput} />
                <button onClick={addDebt}>Add Debt</button>
            </div>
            <div>
                <h6>Your Debts</h6>
                {debts.length === 0 ? (
                    <p>No debts to display</p>
                ) : (
                    <ul>
                        {debts.map((debt, index) => (
                            <li key={index}>
                                <strong>{debt.creditor}</strong>: ₦{debt.amount.toFixed(2)} | Due: {debt.dueDate} |{" "}
                                <span
                                    style={{
                                        color: debt.status === "paid" ? "green" : "red",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => toggleDebtStatus(index)}>
                                    {debt.status === "paid" ? "Paid" : "Unpaid"}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <p>Total Outstanding Debt: ₦{totalOutstandingDebt.toFixed(2)}</p>
                <p>Total Paid Debt: ₦{totalPaidDebt.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default DebtTracker;
