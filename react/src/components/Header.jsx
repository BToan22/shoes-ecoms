import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Carousel } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthService from "../service/AuthService";

import banner1 from "../assets/images/image.png";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";
import logo from "../assets/images/logo.png";

const Header = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const authservice = new AuthService();
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate("/order");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const response = await authservice.getUserData(
                        currentUser.uid
                    );
                    if (
                        response.status === 200 &&
                        response.data.user.is_admin === 1
                    ) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setIsAdmin(false);
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-secondary shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} alt="Logo" height="50" />
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/product">
                            Products
                        </Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>

                        {isAdmin && (
                            <Nav.Link as={Link} to="/admin">
                                Manage
                            </Nav.Link>
                        )}

                        {user ? (
                            <Nav.Link as={Link} to="/profile">
                                {user.displayName || user.email}
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                Account
                            </Nav.Link>
                        )}

                        {user && (
                            <Nav.Link
                                onClick={handleLogout}
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </Nav.Link>
                        )}

                        <Nav.Link
                            onClick={handleCartClick}
                            style={{ cursor: "pointer" }}
                            className="text-black"
                        >
                            <FaShoppingCart size={22} />
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Carousel style={{ marginTop: "70px" }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner2}
                        alt="Slide 1"
                        height="600"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner1}
                        alt="Slide 2"
                        height="600"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={banner3}
                        alt="Slide 3"
                        height="600"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Header;
