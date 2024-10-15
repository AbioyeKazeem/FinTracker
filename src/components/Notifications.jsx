import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";

const Notifications = ({ transactions, limit, setNotificationLimit }) => {
    const [currentLimit, setCurrentLimit] = useState(limit);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // Filter and sum only the expense transactions
        const totalExpenses = transactions
            .filter(transaction => transaction.type === "expense")
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

        // Show warning if total expenses exceed the limit
        if (totalExpenses > currentLimit) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    }, [transactions, currentLimit]);

    const handleLimitChange = (event) => {
        const newLimit = parseFloat(event.target.value);
        setCurrentLimit(newLimit);
        setNotificationLimit(newLimit);
    };

    return (
        <div>
            <Form.Group controlId="formLimit">
                <h5>Set Expense Limit (₦)</h5>
                <Form.Control
                    type="number"
                    value={currentLimit}
                    onChange={handleLimitChange}
                    placeholder="Enter your limit"
                />
            </Form.Group>

            {showWarning && (
                <Alert variant="warning" className="mt-3">
                    Warning: You have exceeded your expense limit of ₦{currentLimit}.
                </Alert>
            )}
        </div>
    );
};

export default Notifications;
