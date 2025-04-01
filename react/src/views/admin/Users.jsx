import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";

const userService = new UserService();

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getList();
                console.log(response);

                setUsers(response);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("There was an error fetching the users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // const handleUserDetail = (userId) => {
    //     navigate(`/admin/users/${userId}`);
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (users.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div>
            <h2 className="my-4 text-center">User List</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone || "Not available"}</td>
                            <td>{user.address || "Not available"}</td>
                            <td>{user.is_admin === 1 ? "Admin" : "User"}</td>
                            {/* <td>
                                <Button
                                    variant="info"
                                    onClick={() => handleUserDetail(user.id)}
                                >
                                    View Detail
                                </Button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;
