import { useContext } from "react";
import { Container, Nav, Navbar, Carousel } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

const Header = () => {
    const { user, isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    const handleCartClick = () => {
        navigate("/order");
    };

    return (
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

                    {user?.is_admin ===1 && (
                        <Nav.Link as={Link} to="/admin/dashboard">
                            Manage
                        </Nav.Link>
                    )}

                    {isLoggedIn ? (
                        <>
                            <Nav.Link
                                as={Link}
                                to="/profile"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "#ffcc00",
                                }}
                            >
                                👤 {user?.name || user?.email}
                            </Nav.Link>
                            <Nav.Link
                                onClick={logout}
                                style={{
                                    cursor: "pointer",
                                    color: "#ff4d4d",
                                    fontWeight: "bold",
                                }}
                            >
                                Logout
                            </Nav.Link>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login">
                            Login
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
    );
};

export default Header;
