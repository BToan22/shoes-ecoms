import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const MenuAdmin = () => {
    return (
        <div>
            <h3 className="text-center text-white py-3">Admin Panel</h3>
            <ListGroup variant="flush">
            <ListGroup.Item className="bg-dark">
                    <Link to="/" className="text-white text-decoration-none">
                        HomePage
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="dashboard" className="text-white text-decoration-none">
                        Dashboard
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="products" className="text-white text-decoration-none">
                        Products
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="orders" className="text-white text-decoration-none">
                        Orders
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark">
                    <Link to="users" className="text-white text-decoration-none">
                        Users
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default MenuAdmin;
