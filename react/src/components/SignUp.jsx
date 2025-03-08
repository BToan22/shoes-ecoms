import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card className="p-4 shadow-lg" style={{ width: "350px" }}>
            <h3 className="text-center">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" autoComplete="off" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your Email" autoComplete="off" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" autoComplete="off" />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>Already have an account?</p>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;