import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import OrderService from "../../service/OrderService";
import OrderDetail from "../../components/admin/OrderDetail";

const orderService = new OrderService();

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = () => {
        orderService
            .getListAllOrder()
            .then((res) => {
                setOrders(res);
                console.log(res);
            })
            .catch((error) => console.error("Error loading orders:", error));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleView = (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        setSelectedOrder(order);
        setShowModal(true);
    };


    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await orderService.deleteOrder(orderId);
                fetchOrders();
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        }
    };

    return (
        <Container>
            <h1>Order List</h1>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderDetail order={selectedOrder}  onClose={() => setShowModal(false)} />
                </Modal.Body>
            </Modal>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>User Name</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.id}</td>
                            <td>{order.user.name}</td>
                            <td>${order.total_amount}</td>
                            <td>{order.status}</td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleView(order.id)}
                                >
                                    View
                                </Button>
                                {/* <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(order.id)}
                                >
                                    Delete
                                </Button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Orders;
