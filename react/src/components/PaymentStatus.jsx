import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import PaymentService from "../service/PaymentService";
import OrderService from "../service/OrderService";

const paymentService = new PaymentService();
const orderService = new OrderService();

const PaymentStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) {
            setStatus("error");
            return;
        }

        paymentService
            .checkPaymentStatus(sessionId)
            .then((result) => {
                console.log(result.status);
                setStatus(result.status);

                return paymentService.updatePaymentStatus(
                    sessionId,
                    result.status
                );
            })
            .then((updateResponse) => {
                console.log("Payment updated:", updateResponse);

                if (
                    updateResponse.order_id &&
                    updateResponse.status === "success"
                ) {
                    return orderService.updateOrderStatus(
                        updateResponse.order_id,
                        "to Ship"
                    );
                }
            })
            .then(() => {
                console.log("Order status updated successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                setStatus("error");
            });
    }, [location.search]);

    return (
        <Container className="mt-5 pt-5 text-center">
            {status === "loading" ? (
                <Spinner animation="border" />
            ) : status === "success" ? (
                <>
                    <h2 className="fw-bold text-success">
                        Payment Successful!
                    </h2>
                    <p>Your payment was processed successfully.</p>
                </>
            ) : (
                <>
                    <Alert variant="danger">Payment Failed!</Alert>
                    <Button variant="dark" onClick={() => navigate("/")}>
                        Return to Home
                    </Button>
                </>
            )}
        </Container>
    );
};

export default PaymentStatus;
