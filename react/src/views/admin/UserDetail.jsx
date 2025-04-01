// src/pages/UserDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";

const userService = new UserService();
const UserDetail = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const response = await userService.getDetail(userId);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };

        fetchUserDetail();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found!</div>;
    }

    return (
        <div>
            <h2 className="my-4 text-center">User Detail</h2>
            <div className="border p-4 shadow-sm rounded">
                <div>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                        <strong>Address:</strong> {user.address}
                    </p>
                    <p>
                        <strong>Role:</strong>{" "}
                        {user.is_admin ? "Admin" : "User"}
                    </p>
                </div>
                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/users")}
                    >
                        Back to User List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
