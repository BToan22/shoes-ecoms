import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import OrderService from "../service/OrderService";
import PaymentService from "../service/PaymentService";

const orderService = new OrderService();
const paymentService = new PaymentService();

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { product, quantity } = location.state || {};

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(user);
        if (!user) {
            navigate("/login");
        } else {
            setFullName(user.name || "");
            setAddress(user.address || "");
            setPhoneNumber(user.phone || "");
        }
    }, [user, navigate]);

    if (!product) {
        return <h2 className="text-center mt-5">No products are selected!</h2>;
    }

    const handlePlaceOrder = async () => {
        if (!fullName || !address || !phoneNumber || !paymentMethod) {
            setError("Please fill in all required information!");
            return;
        }

        if (!user?.id) {
            setError("User ID not found. Please log in again.");
            navigate("/login");
            return;
        }

        setLoading(true);
        setError("");

        const orderData = {
            user_id: user.id,
            items: [{ product_id: product.id, quantity: quantity }],
        };

        try {
            const orderResponse = await orderService.addOrder(orderData);
            console.log(orderResponse);
            if (paymentMethod === "Momo") {
                await paymentService.createMomoPayment(
                    product.price * quantity
                );
            } else if (paymentMethod === "Credit Card") {
                const paymentResponse =
                    await paymentService.createCreditCardPayment(
                        product.price * quantity
                    );

                console.log(paymentResponse);

                if (paymentResponse?.session_id && paymentResponse?.url) {
                    await paymentService.createPaymentRecord(
                        orderResponse.order.id,
                        paymentResponse.session_id,
                        product.price * quantity,
                        "Credit Card"
                    );
                    window.location.href = paymentResponse.url;
                } else {
                    setError("Unable to proceed with payment.");
                }
            } else if (paymentMethod === "Cash on Delivery") {
                navigate("/order");
            }
        } catch (err) {
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
                        placeholder="Enter your full name"
                    />
                </Form.Group>
                <Form.Group controlId="address" className="mt-3">
                    <Form.Label className="fw-bold">Address:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber" className="mt-3">
                    <Form.Label className="fw-bold">Phone Number:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
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
                    <option>Cash on Delivery</option>
                    <option>Momo</option>
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
