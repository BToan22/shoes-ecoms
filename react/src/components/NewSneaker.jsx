import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProductService from "../service/ProductService";

const productService = new ProductService();

const NewSneaker = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        productService
            .getList()
            .then((res) => {
                setProducts(res);
            })
            .catch((error) => console.error("Error loading products:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container className="py-5">
            <h2 className="text-center">NEW SNEAKER</h2>
            <Row className="mt-4">
                {products.map((sneaker, index) => (
                    <Col md={4} key={index}>
                        <Card className="text-center p-3 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={
                                    sneaker.images?.[0]?.image_url ||
                                    "https://via.placeholder.com/150"
                                }
                                alt={sneaker.name}
                            />
                            <Card.Body>
                                <Card.Title>{sneaker.name}</Card.Title>
                                <p>Price: {sneaker.price} USD</p>
                                <p>⭐⭐⭐⭐⭐</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewSneaker;
