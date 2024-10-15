import React, { useState } from "react";
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setSuccess("");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.email === email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            setSuccess("Password reset successful");
            setError("");
        } else {
            setError("No user found with this email");
            setSuccess("");
        }
    };

    return (
        <Container>
            <h4 className="text-center">Reset Password</h4>
            <Form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
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
                <Form.Group controlId="newPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" className="w-btn" size="sm" type="submit">Reset Password</Button> 
            </Form>
            <div className="mt-3 text-center">
                <p>Remembered your password? <Link to="/login">Login</Link></p>
            </div>
        </Container>
    );
}

export default PasswordReset;
