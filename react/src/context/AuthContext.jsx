import { createContext, useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import Cookies from "js-cookie";

export const AuthContext = createContext();
const authService = new AuthService();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser || storedUser === "undefined") {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => user !== null);


    useEffect(() => {
        const token = Cookies.get("jwt");
        if (token && !user) {
            authService
                .getUser()
                .then((userData) => {
                    setUser(userData);
                    setIsLoggedIn(true);
                    localStorage.setItem("user", JSON.stringify(userData));
                })
                .catch(() => {
                    setUser(null);
                    setIsLoggedIn(false);
                    localStorage.removeItem("user");
                });
        }
    }, []);

    const login = () => {
        authService
            .getUser()
            .then((userData) => {
                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .catch(() => {
                setUser(null);
                setIsLoggedIn(false);
                localStorage.removeItem("user");
            });
    };

    const logout = () => {
        authService.logout().then(() => {
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem("user");
            Cookies.remove("jwt");
        });
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
