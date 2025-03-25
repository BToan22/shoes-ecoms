import axiosClient from "../../axiosClient";

export default class ProductService {
    getList(params) {
        return axiosClient.get("/products", { params }).then((res) => res.data);
    }

    getDetail(id) {
        return axiosClient.get(`/products/${id}`).then((res) => res.data);
    }

    add(formData) {
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        return axiosClient
            .post("/products/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data);
    }

    update({ id, name, description, price }) {
        return axiosClient
            .put(`/products/${id}`, { name, description, price })
            .then((res) => res.data);
    }

    delete(id) {
        return axiosClient.delete(`/products/${id}`).then((res) => res.data);
    }
}
