import React, { useState } from "react";
import { ProgressBar, Form, Button, Row, Col } from "react-bootstrap";

const SavingsGoals = () => {
    const [goals, setGoals] = useState([]);
    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [savedAmount, setSavedAmount] = useState("");
    const [amountToAdd, setAmountToAdd] = useState({}); // State to manage input per goal

    const addGoal = (event) => {
        event.preventDefault();
        if (goalName && targetAmount && !isNaN(targetAmount)) {
            const newGoal = {
                name: goalName,
                target: parseFloat(targetAmount) || 0,
                saved: parseFloat(savedAmount) || 0,
            };
            setGoals([...goals, newGoal]);
            setGoalName("");
            setTargetAmount("");
            setSavedAmount("");
        }
    };

    const updateSavedAmount = (index) => {
        const parsedAmount = parseFloat(amountToAdd[index]) || 0;
        if (parsedAmount <= 0) return; 
        const updatedGoals = goals.map((goal, id) => {
            if (id === index) {
                return { ...goal, saved: goal.saved + parsedAmount };
            }
            return goal;
        });
        setGoals(updatedGoals);
        setAmountToAdd({ ...amountToAdd, [index]: '' }); //reset the input after update
    };

    return (
        <div className="savings-goals">
            <h5>Savings Goals</h5>
            <Form onSubmit={addGoal} className="mb-3">
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Goal Name"
                            value={goalName}
                            onChange={(event) => setGoalName(event.target.value)}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Target Amount"
                            value={targetAmount}
                            onChange={(event) => setTargetAmount(event.target.value)}
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Current Saved Amount"
                            value={savedAmount}
                            onChange={(event) => setSavedAmount(event.target.value)}
                        />
                    </Col>
                    <Col>
<Button variant="primary" type="submit" size='sm' className='w-btn'>Add Goal</Button>
                    </Col>
                </Row>
            </Form>
            {goals.length > 0 && (
                <div>
                    {goals.map((goal, index) => {
                        const progress = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
                        return (
                            <div key={index} className="goal-item mb-2">
                                <h6>{goal.name} (₦{goal.saved.toLocaleString()} / ₦{goal.target.toLocaleString()})</h6>
                                <ProgressBar
                                    now={progress}
                                    label={`${Math.round(progress)}%`}
                                    variant={progress >= 100 ? "success" : "info"}
                                />
<Form.Group as={Row} className="mt-2">
<Col xs={8}>
<Form.Control type="number" placeholder="Add to savings" value={amountToAdd[index] || ''} onChange={(event) => setAmountToAdd({ ...amountToAdd, [index]: event.target.value })}/>
</Col>
<Col xs={4}>
<Button variant="success" onClick={() => updateSavedAmount(index)} size="sm">Update</Button>
</Col>
</Form.Group>
</div>
);})}
</div>
)}
</div>
)};

export default SavingsGoals;
