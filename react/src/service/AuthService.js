import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default class AuthService {
    register(userData) {
        return axios
            .post(`${API_URL}/register`, userData)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Registration Error:", err);
                throw err;
            });
    }

    login(email, password) {
        return axios
            .post(`${API_URL}/login`, { email, password })
            .then((res) => {
                if (res.data.token) {
                    return res.data.token;
                }
                throw new Error("Invalid credentials");
            })
            .catch((err) => {
                console.error("Login Error:", err);
                throw err;
            });
    }

    getUser(token) {
        return axios
            .get(`${API_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error("Fetch User Error:", err);
                throw err;
            });
    }
    logout() {
        localStorage.removeItem("token");
    }
}
