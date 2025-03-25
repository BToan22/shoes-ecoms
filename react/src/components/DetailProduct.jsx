import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Footer from "./Footer";
import ProductService from "../service/ProductService";
import OrderService from "../service/OrderService";
import ServiceService from "../service/ServiceService";

const productService = new ProductService();
const orderService = new OrderService();
const serviceService = new ServiceService();
const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        productService
            .getDetail(id)
            .then((res) => {
                setProduct({
                    ...res,
                    price: parseFloat(res.price),
                });
            })
            .catch((error) => console.error("Error fetching product:", error));
        console.log(product);
    }, [id]);

    const handleBuyNow = () => {
        if (!size) {
            alert("Please select a size before proceeding!");
            return;
        } else {
            navigate("/checkout", { state: { product, quantity } });
        }
    };

    if (!product) {
        return <h2 className="text-center mt-5">Unavailable Product!</h2>;
    }
    console.log(product);

    return (
        <>
            {/* <Navbar /> */}
            <div className="pt-5">
                <Container className="mt-5 pt-4">
                    <h2 className="text-center fw-bold">Product Details</h2>
                    <div className="border p-4 shadow-sm rounded bg-white">
                        <Row className="align-items-center">
                            <Col md={6} className="text-center">
                                {product.images ? (
                                    <img
                                        src={
                                            product.images?.[0]?.image_url ||
                                            "https://via.placeholder.com/150"
                                        }
                                        alt={product.name}
                                        className="img-fluid rounded border"
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                        }}
                                    />
                                ) : (
                                    <p className="text-danger">Error Image</p>
                                )}
                            </Col>
                            <Col md={6}>
                                <h4 className="fw-bold">
                                    Name Product: {product.name}
                                </h4>
                                <p className="text-muted">
                                    {product.description}
                                </p>
                                <div className="my-3">
                                    <label className="fw-bold me-3">
                                        Size:
                                    </label>
                                    <Form.Select
                                        value={size}
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option>38</option>
                                        <option>39</option>
                                        <option>40</option>
                                        <option>41</option>
                                        <option>42</option>
                                    </Form.Select>
                                </div>

                                <div className="my-3 d-flex align-items-center">
                                    <label className="fw-bold me-3">
                                        Quantity:
                                    </label>
                                    <Button
                                        variant="light"
                                        onClick={() =>
                                            setQuantity(
                                                quantity > 1 ? quantity - 1 : 1
                                            )
                                        }
                                    >
                                        −
                                    </Button>
                                    <span className="mx-3">{quantity}</span>
                                    <Button
                                        variant="light"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>

                                <h5 className="fw-bold mt-3">
                                    Order Total: ${product.price * quantity}
                                </h5>

                                <Button
                                    variant="dark"
                                    className="mt-3 w-100"
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default DetailProduct;
