import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import OrderService from "../../service/OrderService";

const orderService = new OrderService();

const OrderDetail = ({ orderId, onClose }) => {
    const [order, setOrder] = useState(null);
    console.log(orderId);
    useEffect(() => {
        if (orderId) {
            orderService.getOrderById(orderId).then(setOrder).catch(console.error);
        }
    }, [orderId]);

    if (!order) {
        return <p>Loading order details...</p>;
    }

    return (
        <div>
            <h5>Order ID: {order.id}</h5>
            <p>User ID: {order.user_id}</p>
            <p>Total Price: {order.total_price} VNĐ</p>
            <p>Status: {order.status}</p>

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
                    {order.items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price} VNĐ</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderDetail;
