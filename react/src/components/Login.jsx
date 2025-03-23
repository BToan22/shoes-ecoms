import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import AuthService from "../service/AuthService";
import { AuthContext } from "../context/AuthContext";

const authService = new AuthService();
const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        authService
            .login(email, password)
            .then((token) => {
                login(token);
                console.log(token);
                navigate("/");
            })
            .catch(() => {
                alert("Login failed!");
            });
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "black" }}
        >
            <Card style={{ width: "25rem" }} className="p-4 shadow">
                <Card.Body>
                    <h3 className="text-center mb-4">Login</h3>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={(e) => handleLogin(e)}
                        >
                            Login
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        <Link to="/signup">Don't have an account? Sign up</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
