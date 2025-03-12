import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
    Alert,
} from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth";
import AuthService from "../service/AuthService";

const authService = new AuthService();

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            const response = await authService.getUserData(user.uid);
            if (response.status === 200 && response.data.user.is_admin === 1) {
                navigate("/admin");
            } else if (response.status === 200) {
                navigate("/");
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Row>
                <Col>
                    <Card className="p-4 shadow-lg" style={{ width: "350px" }}>
                        <h3 className="text-center">Sign in</h3>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your Email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your Password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="btn btn-success">
                                Sign Up
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
