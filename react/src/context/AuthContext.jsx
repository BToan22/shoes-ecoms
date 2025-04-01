import { createContext, useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import Cookies from "js-cookie";

export const AuthContext = createContext();
const authService = new AuthService();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService
            .getUser()
            .then((userData) => {
                setUser(userData);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
            })
            .finally(() => setLoading(false));
    }, []);

    const login = () => {
        authService
            .getUser()
            .then((userData) => {
                setUser(userData);
                setIsLoggedIn(true);
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
            });
    };

    const logout = () => {
        authService
            .logout()
            .then(() => {
                setUser(null);
                setIsLoggedIn(false);
                Cookies.remove("jwt");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, user, login, logout, loading }}
        >
            {!loading ? children : <div>Loading...</div>}{" "}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
