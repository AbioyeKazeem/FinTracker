// src/components/IncomeExpenseSummary.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const IncomeExpenseSummary = ({ transactions }) => {
  const income = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const expense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate balance by subtracting expenses from income
  const balance = income - expense;

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>Income & Expense</Card.Title>
        <Row>
          <Col>
            <Card.Text>
              <strong>Income:</strong> #{income.toFixed(2)}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <strong>Expense:</strong> #{expense.toFixed(2)}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default IncomeExpenseSummary;
