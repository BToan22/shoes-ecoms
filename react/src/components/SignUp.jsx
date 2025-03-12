import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AuthService from "../service/AuthService";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const authservice = new AuthService();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            console.log("User created successfully:", user);

            const response = await authservice.register({
                uid: user.uid,
                name,
                email,
                phone,
                address,
            });

            if (response.status === 201) {
                setSuccessMessage("Sign-up successful!");

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                console.error("Error saving user to backend:", response);
            }
        } catch (error) {
            console.error("Signup failed", error.message);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="row">
                <div className="col">
                    <div
                        className="card p-4 shadow-lg"
                        style={{ width: "350px" }}
                    >
                        <h3 className="text-center">Sign Up</h3>

                        {successMessage && (
                            <div className="alert alert-success text-center">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter your name"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your Email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    autoComplete="off"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="Enter your address"
                                    autoComplete="off"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <p>Already have an account?</p>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
