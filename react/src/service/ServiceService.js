import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
const IMG_URL = "http://127.0.0.1:8000";

export default class ServiceService {
    formatProductImages(products) {
        console.log(products);
        return products.map((product) => ({
            ...product,
            images: product.images.map((img) => ({
                ...img,
                image_url: `${IMG_URL}${img.image_url}`,
            })),
        }));
    }
}
