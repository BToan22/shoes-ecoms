import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewSneaker from "../components/NewSneaker";
import SneakerDisplay from "../components/SneakerDisplay";
import Banner from "../components/Banner";

const HomePage = () => {
    return (
        <div className="home-container">
            <Banner />
            <SneakerDisplay />
            <NewSneaker />
        </div>
    );
};

export default HomePage;
