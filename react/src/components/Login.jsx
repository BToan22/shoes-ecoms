import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card className="p-4 shadow-lg" style={{ width: "350px" }}>
            <h3 className="text-center">Sign in</h3>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your Email" autoComplete="off" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter your Password" autoComplete="off" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Link to="/" className="btn btn-success">
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
