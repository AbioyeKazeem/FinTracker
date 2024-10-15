import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function ReccuringTransact({ addRecurringTransaction }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [period, setPeriod] = useState("monthly");

    function handleSubmit(event) {
        event.preventDefault();
        const recurringTransaction = {
            description,
            amount: parseFloat(amount),
            type,
            period,
            lastAdded: null,
        };

        addRecurringTransaction(recurringTransaction);  
        setDescription("");
        setAmount("");
    }

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <h5>Add Recurring Transaction</h5>
            <Row>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Button variant="primary" type="submit" size="sm">
                        Add
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ReccuringTransact;
