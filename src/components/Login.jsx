import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link here
import { Form, Button } from 'react-bootstrap';

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {  
        event.preventDefault();  

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user)); // Store the current user
            setIsAuthenticated(true);
            navigate('/dashboard');  
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h5 className='text-center'>Login</h5>
            {error && <p>{error}</p>}
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" size='sm' className='w-btn'>
                Login
            </Button>
            <div className="mt-3 text-center">
                <p>Register as a new user <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link></p>
                <p>Forgot your password? <Link to="/password-reset" style={{ textDecoration: 'none' }}>Reset</Link></p>
            </div>
        </Form>
    );
}

export default Login;
