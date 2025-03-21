import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import ProductService from "../service/ProductService";
import ServiceService from "../service/ServiceService";

const productService = new ProductService();
const serviceService = new ServiceService();

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        productService
            .getList()
            .then((res) => {
                let data = res;
                console.log(data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            });
    }, []);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center">Danh sách sản phẩm</h1>
                {/* Nút Login */}
                <Button variant="success" onClick={() => navigate("/login")}>
                    Đăng nhập
                </Button>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Card
                            key={product.id}
                            style={{ width: "18rem" }}
                            className="shadow-sm"
                        >
                            {product.images.length > 0 && (
                                <Card.Img
                                    variant="top"
                                    src={product.images[0].image_url}
                                    alt={product.name}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>
                                    <strong>Giá:</strong> {product.price} VNĐ
                                </Card.Text>
                                <Link to={`/product/${product.id}`}>
                                    <Button variant="primary">
                                        Xem chi tiết
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p className="text-center">Không có sản phẩm nào.</p>
                )}
            </div>
        </Container>
    );
};

export default HomePage;
