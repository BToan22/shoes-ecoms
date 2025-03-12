import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import googlePlay from "../assets/images/play-store.png";
import appStore from "../assets/images/app-store.png";
import logo from "../assets/images/logo.png";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <Container>
                <Row className="text-center">
                    <Col md={4} className="mb-3">
                        <h5>Download Our App</h5>
                        <p>Download App for Android mobile phone</p>
                        <Image
                            src={googlePlay}
                            alt="Google Play"
                            width="120"
                            className="mx-2"
                        />
                        <Image
                            src={appStore}
                            alt="App Store"
                            width="120"
                            className="mx-2"
                        />
                    </Col>

                    <Col md={4} className="mb-3">
                        <Image src={logo} alt="Logo" width="100" />
                        <p className="mt-3">
                            Our Purpose is to sustainably make the Presence...
                        </p>
                    </Col>

                    <Col md={2} className="mb-3">
                        <h5>Useful Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Coupons
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Blog Post
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Return Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Become Affiliate
                                </a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={2} className="mb-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-light text-decoration-none"
                                >
                                    YouTube
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <hr className="border-light" />
                <p className="text-center">Copyright 2025 by your team.</p>
            </Container>
        </footer>
    );
};

export default Footer;
