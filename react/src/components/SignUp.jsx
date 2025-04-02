import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import AuthService from "../service/AuthService";

const Signup = ({ setIsLoggedIn, getProfile }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const authService = new AuthService();
    const validatePassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (!validatePassword(password)) {
            alert(
                "Password must be at least 6 characters, include uppercase, lowercase, number, and special character."
            );

            return;
        }
        try {
            const registerResponse = await authService.register({
                name,
                email,
                password,
                phone,
                address,
            });
            navigate("/login");
        } catch (error) {
            setErrorMessage(error.message || "An error occurred.");
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "black" }}
        >
            <Card
                className="p-4"
                style={{ width: "400px", backgroundColor: "#fff" }}
            >
                <h3 className="text-center mb-3">Sign Up</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="w-100">
                        Sign Up
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </Card>
        </Container>
    );
};

export default Signup;
