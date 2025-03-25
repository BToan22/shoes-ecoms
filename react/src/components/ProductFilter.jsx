import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ProductFilter = ({ onFilter }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const brands = ["Nike", "Adidas", "Puma"];

    const handleBrandChange = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const applyFilter = () => {
        onFilter({ brands: selectedBrands, minPrice, maxPrice });
    };

    return (
        <div className="p-3 border rounded bg-light">
            <h5>Search Filter</h5>
            <Form>
                <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    {brands.map((brand) => (
                        <Form.Check
                            key={brand}
                            type="checkbox"
                            label={brand}
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                        />
                    ))}
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <Form.Control
                        type="number"
                        placeholder="Max"
                        className="mt-2"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="dark"
                    className="mt-3 w-100"
                    onClick={applyFilter}
                >
                    Apply
                </Button>
            </Form>
        </div>
    );
};

export default ProductFilter;
