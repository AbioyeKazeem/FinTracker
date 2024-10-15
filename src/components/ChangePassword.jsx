import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { changePassword } from './userUtils'

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    function handlePasswordChange() {
        if (newPassword === confirmPassword) {
            changePassword(currentPassword, newPassword); // Call the function
            setError(""); // Clear error
        } else {
            setError("The new password and confirmation do not match.");
        }
    }

    return (
        <Card className="mt-4">
            <Card.Header>Change Password</Card.Header>
            <Card.Body>
                <Form>
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Group controlId="forCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="forNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="forConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        onClick={handlePasswordChange}
                        className="mt-3"
                    >
                        Change Password
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ChangePassword;
