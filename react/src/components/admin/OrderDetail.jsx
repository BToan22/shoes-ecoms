import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import OrderService from "../../service/OrderService";

const orderService = new OrderService();

const OrderDetail = ({ order, onClose }) => {
    const [selectedStatus, setSelectedStatus] = useState("");
    const [orderDetail, setOrderDetail] = useState(order);

    useEffect(() => {
        setOrderDetail(order);
    }, [order]);

    const handleAddHistory = async () => {
        if (!selectedStatus) {
            alert("Please select a status!");
            return;
        }

        try {
            await orderService.updateOrderStatus(
                orderDetail.id,
                selectedStatus
            );
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error adding order history:", error);
        }
    };

    if (!orderDetail) {
        return <p>Loading order details...</p>;
    }

    return (
        <div>
            <h5>Order ID: {orderDetail.id}</h5>
            <p>User Name: {orderDetail.user?.name}</p>
            <p>Total Price: ${orderDetail.total_amount}</p>
            <p>Status: {orderDetail.status}</p>

            <h6>Order Items:</h6>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>${parseInt(item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h6>Order History:</h6>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.histories &&
                    orderDetail.histories.length > 0 ? (
                        orderDetail.histories.map((history, index) => (
                            <tr key={history.id}>
                                <td>{index + 1}</td>
                                <td>{history.status}</td>
                                <td>
                                    {new Date(
                                        history.changed_at
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No history records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <h6>Add Order History:</h6>
            <Form>
                <Form.Group controlId="statusSelect">
                    <Form.Label>Select Status:</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="to Pay">to Pay</option>
                        <option value="to Ship">to Ship</option>
                        <option value="to Receive">to Receive</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </Form.Control>
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={handleAddHistory}
                    className="mt-2"
                >
                    Add
                </Button>
            </Form>
        </div>
    );
};

export default OrderDetail;
