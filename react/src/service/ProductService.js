import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default class ProductService {
    getList(params) {
        return axios
            .get(`${API_URL}/products`, { params })
            .then((res) => res.data);
    }

    getById(id) {
        return axios
            .get(`${API_URL}/products/${id}`)
            .then((res) => res.data);
    }

    // add({ name, description, price }) {
    //     return axios
    //         .post(`${API_URL}/products`, { name, description, price })
    //         .then((res) => res.data);
    // }

    // update({ id, name, description, price }) {
    //     return axios
    //         .put(`${API_URL}/products/${id}`, { name, description, price })
    //         .then((res) => res.data);
    // }

    // delete(id) {
    //     return axios.delete(`${API_URL}/products/${id}`).then((res) => res.data);
    // }
}