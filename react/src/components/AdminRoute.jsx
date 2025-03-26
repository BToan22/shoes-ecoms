import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
    console.log(isLoggedIn,user);
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !user.is_admin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
