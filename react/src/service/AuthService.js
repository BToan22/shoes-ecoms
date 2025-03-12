import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const API_URL = "http://127.0.0.1:8000/api";

export default class AuthService {
    register(userData) {
        return axios
            .post(`${API_URL}/register`, userData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error register:", error);
                throw error;
            });
    }


    login(credentials) {
        return axios
            .post(`${API_URL}/login`, credentials)
            .then((response) => {
                if (response.data.status === 200) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data.user)
                    );
                }
                return response.data;
            })
            .catch((error) => {
                console.error("Error Login:", error);
                throw error;
            });
    }


    logout() {
        return axios
            .post(`${API_URL}/logout`)
            .then((response) => {
                localStorage.removeItem("user");
                return response.data;
            })
            .catch((error) => {
                console.error("Error Logout:", error);
                throw error;
            });
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolve(user);
                } else {
                    reject("No authenticated user found");
                }
            });
        });
    }
    getUserData(uid) {
        return axios
            .post(`${API_URL}/me`, { uid })
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error fetching user data:", error);
                throw error;
            });
    }
}
