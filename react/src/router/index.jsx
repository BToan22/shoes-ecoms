import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import HomePage from "../views/Homepage";
import Dashboard from "../views/admin/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../components/layout/AdminLayout";
import Products from "../views/admin/Products";
import Product from "../views/Product";
import Orders from "../views/admin/Orders";
import DetailProduct from "../components/DetailProduct";
import MainLayout from "../components/layout/MainLayout";
import Checkout from "../views/Checkout";
import Order from "../views/Order";
import AdminRoute from "../components/AdminRoute";
import Profile from "../views/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import RedirectRoute from "../components/RedirectRoute";

import PaymentStatus from "../components/PaymentStatus";
import Users from "../views/admin/Users";
import UserDetail from "../views/admin/UserDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/product", element: <Product /> },
            { path: "/product/:id", element: <DetailProduct /> },
        ],
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    { path: "/checkout", element: <Checkout /> },
                    { path: "/order", element: <Order /> },
                    { path: "/payment-status", element: <PaymentStatus /> },
                    { path: "/profile", element: <Profile /> },
                ],
            },
        ],
    },

    {
        path: "/admin",
        element: <AdminRoute />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "products", element: <Products /> },
                    { path: "orders", element: <Orders /> },
                    { path: "users", element: <Users /> },
                    { path: "users/:userId", element: <UserDetail /> },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <RedirectRoute />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
]);

export default router;
