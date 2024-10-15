import React, { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";

function UserProfile({ user, updateUser }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [showModal, setShowModal] = useState(false);

    function updateHandle() {
        const userUpdate = {
            ...user,
            name,
            email,
            phone,
        };
        updateUser(userUpdate);
        setShowModal(true); // Show the modal when information is saved
    }

    function handleClose() {
        setShowModal(false); // Close the modal
    }

    return (
        <Card>
            <Card.Header>Manage Personal Information</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={updateHandle} className="mt-3"> Save Changes</Button>
                </Form>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Information saved</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    );
}

export default UserProfile;
