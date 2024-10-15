import React, {useState} from "react";
import {Form, Button, Card} from "react-bootstrap";
import Notifications from "./Notifications";


function AccountSettings({userSettings,updateSettings}){
    const [notifications, setNotifications] = useState(userSettings.notifications);

    function saveSettingsHandle(){
        updateSettings({notifications})
    };

    return (
        <Card className="mt-4">
            <Card.Header>Account Settings</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formNotifications">
                        <Form.Check
                        type="checkbox"
                        label="Receive notifications"
                        checked={notifications}
                        onChange={event=>setNotifications(event.target.value)}
                        />
                    </Form.Group>
<Button variant="primary" onClick={saveSettingsHandle} className="mt-3">Save Settings</Button>
                </Form>
            </Card.Body>

        </Card>
    )
};
export default AccountSettings;