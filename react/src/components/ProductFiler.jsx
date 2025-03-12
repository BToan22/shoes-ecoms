import React from "react";
import { Form, Button } from "react-bootstrap";

const ProductFilter = () => {
  return (
    <div className="p-3 border rounded bg-light">
      <h5>Search Filter</h5>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Check type="checkbox" label="Nike" />
          <Form.Check type="checkbox" label="Adidas" />
          <Form.Check type="checkbox" label="Puma" />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Min" />
          <Form.Control type="number" placeholder="Max" className="mt-2" />
        </Form.Group>

        <Button variant="dark" className="mt-3 w-100">Apply</Button>
      </Form>
    </div>
  );
};

export default ProductFilter;
