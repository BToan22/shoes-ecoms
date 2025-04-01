import axiosClient from "../../axiosClient";

export default class ProductService {
    getList(params) {
        return axiosClient.get("/products", { params }).then((res) => res.data);
    }

    getLatest(params) {
        return axiosClient
            .get("/products/latest", { params })
            .then((res) => res.data);
    }
    getListWithSearch(params) {
        return axiosClient
            .get("/products-search", { params })
            .then((res) => res.data);
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

    update(id, formData) {
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        return axiosClient
            .post(`/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => res.data)
            .catch((error) => {
                console.error("Update error:", error);
                throw error;
            });
    }

    delete(productId) {
        return axiosClient
            .delete(`/products/${productId}`)
            .then((res) => res.data);
    }
    addProductView(productId) {
        return axiosClient
            .post(`/product/view/${productId}`)
            .then((res) => res.data);
    }
    recommended(){
        return axiosClient
            .get(`/user/recommended-shoes`)
            .then((res) => res.data);
    }
}
