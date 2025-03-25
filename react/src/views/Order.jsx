import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import OrderService from "../service/OrderService";
import { AuthContext } from "../context/AuthContext";

const orderservice = new OrderService();

const Order = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(user);
        const fetchOrders = async () => {
            if (!user?.id) return;
            try {
                const data = await orderservice.getOrdersByUser(user.id);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user?.id]);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?"))
            return;

        try {
            await orderservice.updateOrderStatus(orderId, "Canceled");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: "Canceled" }
                        : order
                )
            );
        } catch (error) {
            console.error("Failed to cancel order:", error);
        }
    };

    const filteredOrders = orders.filter((order) =>
        order.items?.some(
            (item) =>
                item.product?.name &&
                item.product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold">My Purchase</h2>

            <div className="text-center my-3">
                <span className="mx-3">All</span> |
                <span className="mx-3">To Pay</span> |
                <span className="mx-3">To Ship</span> |
                <span className="mx-3">To Receive</span> |
                <span className="mx-3">Completed</span> |
                <span className="mx-3">Canceled</span>
            </div>

            <Form className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="🔍 Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value.trim())}
                />
            </Form>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <div
                        key={order.id}
                        className="border p-4 shadow-sm rounded mb-3 bg-white"
                    >
                        <h5 className="fw-bold">Order ID: {order.id}</h5>
                        <p>
                            Status:{" "}
                            <span
                                className={
                                    order.status === "Completed"
                                        ? "text-success"
                                        : "text-warning"
                                }
                            >
                                {order.status}
                            </span>
                        </p>

                        {order.items.map((item) => (
                            <Row key={item.id} className="align-items-center">
                                <Col md={3}>
                                    <img
                                        src={
                                            item.product?.image_url ||
                                            "placeholder.jpg"
                                        }
                                        alt={item.product?.name || "Unknown"}
                                        className="img-fluid rounded"
                                    />
                                </Col>
                                <Col md={6}>
                                    <p>
                                        <strong>Product:</strong>{" "}
                                        {item.product?.name || "Unknown"}
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong>{" "}
                                        {item.quantity}
                                    </p>
                                    <h5 className="fw-bold">
                                        <strong>Price:</strong> ${parseInt(item.price)}
                                    </h5>
                                </Col>
                            </Row>
                        ))}

                        {order.status === "to Pay" && (
                            <div className="text-end mt-3">
                                <Button
                                    variant="danger"
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    Cancel Order
                                </Button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <h5 className="text-center text-muted">No orders found!</h5>
            )}
        </Container>
    );
};

export default Order;
