import axios from "axios";
import axiosClient from "../../axiosClient";
const API_URL = "http://127.0.0.1:8000/api";

export default class OrderService {
    getListAllOrder(params) {
        return axiosClient
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
        return axiosClient
            .post(`${API_URL}/orders/add`, orderData)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error creating order:", err);
                throw err;
            });
    }

    getOrdersByUser(userId) {
        return axiosClient
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
    updateOrderStatus(orderId, status) {
        console.log(orderId, status);
        return axiosClient
            .put(`${API_URL}/orders/${orderId}/status`, { status })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error updating order status:", err);
                throw err;
            });
    }
}
