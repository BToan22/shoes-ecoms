import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RedirectRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectRoute;
