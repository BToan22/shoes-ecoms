import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Pagination } from "react-bootstrap";
import ProductService from "../../service/ProductService";
import ProductDetail from "../../components/admin/ProductDetail";

const productService = new ProductService();

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const [perPage, setPerPage] = useState(10); // Số sản phẩm trên mỗi trang

    const fetchProducts = (page = currentPage) => {
        productService
            .getList({ page, per_page: perPage }) // Truyền số trang và số sản phẩm mỗi trang
            .then((res) => {
                setProducts(res.data); // Dữ liệu sản phẩm
                setTotalPages(res.last_page); // Tổng số trang
            })
            .catch((error) => console.error("Error loading products:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, perPage]); // Cập nhật khi trang hoặc số sản phẩm mỗi trang thay đổi

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAdd = () => {
        setSelectedProductId(null);
        setShowModal(true);
    };

    const handleEdit = (productId) => {
        setSelectedProductId(productId);
        setShowModal(true);
    };

    const handleDelete = (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        productService
            .delete(productId)
            .then(() => {
                alert("Product deleted successfully!");
                fetchProducts(); // Refresh product list after delete
            })
            .catch((error) => console.error("Error deleting product:", error));
    };

    return (
        <Container>
            <h1>Product List</h1>

            <Button variant="primary" onClick={handleAdd} className="mb-3">
                Add Product
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProductId ? "Edit Product" : "Add New Product"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductDetail
                        productId={selectedProductId}
                        onProductSaved={fetchProducts}
                        onClose={() => setShowModal(false)}
                    />
                </Modal.Body>
            </Modal>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{(currentPage - 1) * perPage + index + 1}</td>
                            <td>
                                <img
                                    src={product.images[0]?.image_url}
                                    alt={product.name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                    }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Phân trang */}
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </Container>
    );
};

export default Products;
