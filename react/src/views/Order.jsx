import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";
import OrderService from "../service/OrderService";
import { AuthContext } from "../context/AuthContext";

const orderservice = new OrderService();

const Order = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputSearch, setInputSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        if (!user?.id) return;
        fetchOrders();
    }, [user?.id, selectedStatus, searchTerm]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await orderservice.getOrdersByUser(
                user.id,
                selectedStatus,
                searchTerm
            );
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

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

    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
    };

    const handleSearch = () => {
        setSearchTerm(inputSearch.trim());
    };

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold">My Purchase</h2>

            <div className="text-center my-3">
                {[
                    "All",
                    "To Pay",
                    "To Ship",
                    "To Receive",
                    "Completed",
                    "Canceled",
                ].map((status) => (
                    <span
                        key={status}
                        className={`mx-3 ${
                            selectedStatus === status
                                ? "fw-bold text-primary"
                                : ""
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            handleStatusFilter(status === "All" ? "" : status)
                        }
                    >
                        {status}
                    </span>
                ))}
            </div>

            <Form className="d-flex mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search orders..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />
                <Button
                    variant="primary"
                    className="ms-2"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Form>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : orders.length > 0 ? (
                orders.map((order) => (
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
                                        <strong>Price:</strong> $
                                        {parseInt(item.price)}
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
