import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import user1 from "../assets/images/user-1.png"
import user2 from "../assets/images/user-2.png"
import user3 from "../assets/images/user-3.png"

const testimonials = [
  { name: "Mona Lundquist", review: "Life is too short to wear boring shoes.", rating: 5, img: user1 },
  { name: "Margaret", review: "Shoes speak louder than words.", rating: 4,img: user2},
  { name: "Ester Rajna", review: "Good shoes take you good places.", rating: 3,img: user3},
];

const Testimonials = () => {
  return (
    <Container className="py-5">
      <Row>
        {testimonials.map((item, index) => (
          <Col md={4} key={index}>
           <Card.Img variant="top" src={item.img} />
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
                <p>“{item.review}”</p>
                <p>⭐⭐⭐⭐⭐</p>
                <p><strong>{item.name}</strong></p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
