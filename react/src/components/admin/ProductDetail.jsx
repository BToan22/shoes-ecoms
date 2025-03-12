import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ProductService from "../../service/ProductService";

const productService = new ProductService();

const ProductDetail = ({ productId, onProductSaved, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        brand: "",
        images: [],
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const response = await productService.getById(productId);
                    if (response.status === 200) {
                        const product = response.data;
                        setFormData({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            brand: product.brand,
                            images: product.images || [],
                        });
                        setIsEditing(true);
                    }
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("brand", formData.brand);

        formData.images.forEach((file) => {
            data.append("images[]", file);
        });

        try {
            let res;
            if (isEditing) {
                res = await productService.update(productId, data);
            } else {
                res = await productService.add(data);
            }

            console.log(res);
            onProductSaved();
            onClose();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2>{isEditing ? "Edit Product" : "Add Product"}</h2>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                {isEditing ? "Update Product" : "Add Product"}
            </Button>
        </Form>
    );
};

export default ProductDetail;
