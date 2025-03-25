import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import ProductFilter from "../components/ProductFilter";
import ProductService from "../service/ProductService";
import { useNavigate } from "react-router-dom";

const productService = new ProductService();

const Product = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(currentPage, filters);
    }, [currentPage, filters]);

    const fetchProducts = (page, filterData, search = "") => {
        productService
            .getListWithSearch({ page, search, ...filterData })
            .then((res) => {
                console.log(res);
                setProducts(res.data);
                setLastPage(res.last_page);
            })
            .catch((error) => console.error("Error loading products:", error));
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchProducts(1, filters, searchTerm);
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md={12} className="mb-4">
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button
                            variant="dark"
                            onClick={handleSearch}
                            className="ms-2"
                        >
                            Search
                        </Button>
                    </Form>
                </Col>

                {/* Filter */}
                <Col md={3}>
                    <ProductFilter onFilter={handleFilter} />
                </Col>

                <Col md={9}>
                    <Row>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Col key={product.id} md={4} className="mb-4">
                                    <Card
                                        className="border-0"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            navigate(`/product/${product.id}`)
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
                                        <Card.Body className="text-center">
                                            <h5>{product.name}</h5>
                                            <p>Price: {product.price}$</p>
                                            <p>⭐⭐⭐⭐⭐</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <h5 className="text-center text-muted">
                                No products found!
                            </h5>
                        )}
                    </Row>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                        <Button
                            variant="secondary"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="me-2"
                        >
                            Previous
                        </Button>
                        <span className="align-self-center">
                            Page {currentPage} of {lastPage}
                        </span>
                        <Button
                            variant="secondary"
                            disabled={currentPage === lastPage}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="ms-2"
                        >
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;
