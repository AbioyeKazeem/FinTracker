import React from "react";
import { Button, Card } from "react-bootstrap";

function DeleteAccount ({ deleteAccount }){
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            deleteAccount(); // Call delete account function
        }
    };

    return (
        <Card className="mt-4">
            <Card.Header>Delete Account</Card.Header>
            <Card.Body>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Account
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DeleteAccount;
