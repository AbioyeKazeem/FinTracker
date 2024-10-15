import React from "react"
import { Card } from "react-bootstrap"

const Balance =({transactions})=>{
     const income = transactions
    .filter(transaction => transaction.type === "income")
    .reduce((acc,transaction)=> acc + parseFloat(transaction.amount),0);

    const expense = transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((acc,transaction)=> acc + parseFloat(transaction.amount),0);

    const total = income - expense;

    return (
        <Card className="my-3">
            <Card.Body>
                <Card.Title>Account Balance</Card.Title>
                <Card.Text>#{total.toFixed(2)}</Card.Text>
            </Card.Body>
        </Card>
    )
};
export default Balance;