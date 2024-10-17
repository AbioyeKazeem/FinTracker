import React from "react";
import { ListGroup } from "react-bootstrap";

const TransactionList = ({ incomeTransactions = [], expenseTransactions = [] }) => {
    return (
        <div>
            <h5>Transaction List</h5>
            <p>Income List</p>
            <ListGroup>
                {incomeTransactions.length > 0 ? (
                    incomeTransactions.map((transaction, index) => (
                        <ListGroup.Item key={index} className="custom-list-item">
                            {transaction.description} - #{transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No income transactions found.</ListGroup.Item>
                )}
            </ListGroup>
            <p>Expenses List</p>
            <ListGroup>
                {expenseTransactions.length > 0 ? (
                    expenseTransactions.map((transaction, index) => (
                        <ListGroup.Item key={index} className="custom-list-item">
                            {transaction.description} - #{transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
                        </ListGroup.Item>  
                    ))
                ) : (
                    <ListGroup.Item>No expense transactions found.</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default TransactionList;
