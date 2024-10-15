import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function TransactForm({ addTransaction }) {
    const [transaction, setTransaction] = useState({
        description: "",
        amount: "",
        type: "income",
        category: "",
        date: ""
    });

    const categories = ["Groceries", "Rent", "Utilities", "Entertainment", "Transport", "Others"]; // Example categories

    function handleChange(event) {
        const { name, value } = event.target;
        setTransaction((prevTransaction) => ({
            ...prevTransaction,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formattedTransaction = {
            ...transaction,
            date: new Date().toISOString(), // Add the date
        };
        addTransaction(formattedTransaction);
        setTransaction({ description: "", amount: "", type: "income", category: "", date: "" }); // Reset form
    }

    return (
        <div>
            <h5>Daily Transaction</h5>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={transaction.description}
                                placeholder="Enter the transaction description"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={transaction.amount}
                                placeholder="Enter the amount"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="type"
                                value={transaction.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                value={transaction.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className="mt-3 small-width rounded-button" size="sm" style={{ borderRadius: "100px" }}>
                        Add Transaction
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TransactForm;
