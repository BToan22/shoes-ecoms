import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import OrderService from "../service/OrderService";
import AuthService from "../service/AuthService";

const orderService = new OrderService();
const authservice = new AuthService();

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { product, quantity } = location.state || {};

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await authservice.getCurrentUser();
                if (currentUser) {
                    const userData = await authservice.getUserData(
                        currentUser.uid
                    );
                    console.log("User Data:", userData);

                    const extractedUserId = userData?.data?.user?.id;
                    console.log("Extracted User ID:", extractedUserId);

                    setUserId(extractedUserId);
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Unable to fetch user data.");
            }
        };

        fetchUserData();
    }, []);

    if (!product) {
        return <h2 className="text-center mt-5">No products are selected!</h2>;
    }

    const handlePlaceOrder = async () => {
        if (!fullName || !address || !phoneNumber || !paymentMethod) {
            setError("Please fill in all required information!");
            return;
        }

        if (!userId) {
            setError("User ID not found. Please log in again.");
            return;
        }

        setLoading(true);
        setError("");

        const orderData = {
            user_id: userId,
            items: [
                {
                    product_id: product.id,
                    quantity: quantity,
                },
            ],
        };

        try {
            const response = await orderService.addOrder(orderData);
            console.log("Order Created:", response);
            navigate("/order");
        } catch (err) {
            console.error("Order Creation Error:", err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 pt-5 mb-5">
            <h2 className="text-center fw-bold">Delivery Address</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="mb-4">
                <Form.Group controlId="fullName">
                    <Form.Label className="fw-bold">Full Name:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="address" className="mt-3">
                    <Form.Label className="fw-bold">Address:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="phoneNumber" className="mt-3">
                    <Form.Label className="fw-bold">Phone Number:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
            </Form>

            <Row className="mt-4 border p-4 shadow-sm rounded bg-light">
                <Col md={4} className="text-center">
                    <img
                        src={
                            product.images?.[0]?.image_url ||
                            "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: "100%" }}
                    />
                </Col>
                <Col md={8}>
                    <h4 className="fw-bold">Product: {product.name}</h4>
                    <h5>Quantity: {quantity}</h5>
                    <h4 className="fw-bold mt-2">
                        Order Total: ${product.price * quantity}
                    </h4>
                </Col>
            </Row>

            <Form.Group controlId="paymentMethod" className="mt-4">
                <Form.Label className="fw-bold">Payment Method</Form.Label>
                <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>Cash on Delivery</option>
                </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
                <Button
                    variant="dark"
                    className="px-4"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Place Order"}
                </Button>
            </div>
        </Container>
    );
};

export default Checkout;
