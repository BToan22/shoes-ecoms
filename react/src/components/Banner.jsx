import { Carousel } from "react-bootstrap";
import banner1 from "../assets/images/image.png";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";

const Banner = () => {
    return (
        <Carousel style={{ marginTop: "70px" }}>
            <Carousel.Item>
                <img className="d-block w-100" src={banner2} alt="Slide 1" height="600" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={banner1} alt="Slide 2" height="600" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={banner3} alt="Slide 3" height="600" />
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;
