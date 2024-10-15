import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            setError("User already exists.");
        } else {
            const newUser = { email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            setError(""); // Clear error
            setEmail(""); // Clear email field
            setPassword(""); // Clear password field
            setConfirmPassword(""); // Clear confirm password field
            navigate("/login"); // Redirect to login page
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h5 className="text-center">Signup</h5>
            <Form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-btn" size="sm">Signup</Button>
            </Form>
            <div className="mt-3 text-center">
                <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></p>
            </div>
        </Container>
    );
}

export default Signup;
