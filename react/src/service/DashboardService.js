import axiosClient from "../../axiosClient";

const API_URL = "http://127.0.0.1:8000/api";

export default class DashboardService {
    getStats() {
        return axiosClient.get(`${API_URL}/dashboard/stats`).then((res) => res.data);
    }
}
