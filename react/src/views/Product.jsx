import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form,Card } from "react-bootstrap";
import ProductFilter from "../components/ProductFiler";
import ProductList from "../components/NewSneaker";
import ProductService from "../service/ProductService";
import { useNavigate } from "react-router-dom";

const productService = new ProductService();

const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        productService
            .getList()
            .then((res) => {
                setProducts(res);
            })
            .catch((error) => console.error("Error loading products:", error));
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Container className="py-5">
                <Row>
                    <Form className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form>

                    <Col md={3}>
                        <ProductFilter />
                    </Col>

                    <Col md={9}>
                        <h2 className="text-center mb-4">New Sneaker</h2>

                        <Row>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Col
                                        key={product.id}
                                        md={4}
                                        className="mb-4"
                                    >
                                        <div
                                            className="card shadow-sm"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`
                                                )
                                            }
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={
                                                    product.images?.[0]
                                                        ?.image_url ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                alt={product.name}
                                            />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">
                                                    {product.name}
                                                </h5>
                                                <p className="card-text">
                                                    Giá: {product.price}$
                                                </p>
                                                <p>⭐⭐⭐⭐⭐</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <h5 className="text-center text-muted">
                                    No products found!
                                </h5>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Product;
