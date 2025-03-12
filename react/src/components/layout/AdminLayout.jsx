import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MenuAdmin from "./MenuAdmin";

const AdminLayout = () => {
    return (
        <Container fluid>
            <Row>
                {/* Sidebar Menu */}
                <Col md={3} lg={2} className="bg-dark text-white min-vh-100 p-3">
                    <MenuAdmin />
                </Col>

                {/* Main Content */}
                <Col md={9} lg={10} className="p-4">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLayout;
