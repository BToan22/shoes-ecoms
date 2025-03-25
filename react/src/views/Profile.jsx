import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../service/AuthService";

const authService = new AuthService();
const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) return;

        setLoading(true);
        authService
            .getUserProfile(user.id)
            .then((data) => {
                setProfile(data);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!profile) {
        return <h3 className="text-center mt-5">User not found</h3>;
    }

    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold">User Profile</h2>
            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h4 className="text-primary fw-bold">
                                {profile.name || "Unknown User"}
                            </h4>
                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {profile.phone || "N/A"}
                            </p>
                            <p>
                                <strong>Address:</strong>{" "}
                                {profile.address || "N/A"}
                            </p>
                            <p>
                                <strong>Role:</strong>{" "}
                                {profile.is_admin === 1 ? "Admin" : "User"}
                            </p>
                            <p>
                                <strong>Joined At:</strong>{" "}
                                {new Date(
                                    profile.created_at
                                ).toLocaleDateString()}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
