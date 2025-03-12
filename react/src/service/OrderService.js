import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default class OrderService {
    getListAllOrder(params) {
        return axios
            .get(`${API_URL}/getAllOrder`, { params })
            .then((res) => res.data);
    }

    getOrderById(orderId) {
        return axios
            .get(`${API_URL}/orders/${orderId}`)
            .then((res) => res.data);
    }

    deleteOrder(orderId) {
        return axios.delete(`${API_URL}/orders/${orderId}`);
    }

    addOrder(orderData) {
        return axios
            .post(`${API_URL}/orders/add`, orderData)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error creating order:", err);
                throw err;
            });
    }

    getOrdersByUser(userId) {
        return axios
            .get(`${API_URL}/orders/by-user/${userId}`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching orders by user:", err);
                throw err;
            });
    }
    cancelOrder(orderId) {
        return axios
            .post(`${API_URL}/orders/${orderId}/cancel`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error canceling order:", error);
                throw error;
            });
    }
}
