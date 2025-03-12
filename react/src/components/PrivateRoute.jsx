import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    //   const { user } = useContext(AuthContext);
    //   return user ? children : <Navigate to="/login" />;
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
