import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaCalendarCheck,
} from "react-icons/fa";
import DashboardService from "../../service/DashboardService";

const dashboardService = new DashboardService();

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getStats();
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: "Total Products",
            value: stats?.total_products,
            color: "#007bff",
            icon: <FaBox size={30} />,
        },
        {
            title: "Total Users (Excluding Admins)",
            value: stats?.total_users,
            color: "#28a745",
            icon: <FaUsers size={30} />,
        },
        {
            title: "Orders Today",
            value: stats?.orders_today,
            color: "#ffc107",
            icon: <FaShoppingCart size={30} />,
        },
        {
            title: "Orders This Month",
            value: stats?.orders_this_month,
            color: "#dc3545",
            icon: <FaCalendarCheck size={30} />,
        },
    ];

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Dashboard</h1>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row>
                    {statCards.map((stat, index) => (
                        <Col key={index} md={6} lg={3} className="mb-4">
                            <Card
                                className="border-0"
                                style={{
                                    backgroundColor: stat.color,
                                    color: "#fff",
                                    borderRadius: "10px",
                                }}
                            >
                                <Card.Body className="text-center">
                                    <div className="mb-3">{stat.icon}</div>
                                    <Card.Title className="fs-6">
                                        {stat.title}
                                    </Card.Title>
                                    <Card.Text className="fs-2 fw-bold">
                                        {stat.value}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Dashboard;
