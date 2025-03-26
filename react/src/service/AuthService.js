import axiosClient from "../../axiosClient";

export default class AuthService {
    register(userData) {
        return axiosClient
            .post("/register", userData)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Registration Error:", err);
                throw err;
            });
    }

    login(email, password) {
        return axiosClient
            .post("/login", { email, password } )
            .then((res) => res.data)
            .catch((err) => {
                console.error("Login Error:", err);
                throw err;
            });
    }

    getUser() {
        return axiosClient
            .get("/me")
            .then((res) => res.data)
            .catch((err) => {
                console.error("Fetch User Error:", err);
                throw err;
            });
    }

    logout() {
        return axiosClient
            .post("/logout")
            .then(() => console.log("Logged out"))
            .catch((err) => {
                console.error("Logout Error:", err);
                throw err;
            });
    }

    getUserProfile(userId) {
        return axiosClient
            .get(`/profile/${userId}`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching profile:", err);
                throw err;
            });
    }
    getUser() {
        return axiosClient.get("/me")
            .then((res) => res.data)
            .catch((err) => {
                console.error("Fetch User Error:", err);
                throw err;
            });
    }
}
