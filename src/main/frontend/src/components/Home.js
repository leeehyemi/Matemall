import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
    return (
    <div className="home-container">
        <img className="img-main" src="img/matemall.png" alt="" />
        <div className="home-buttons">
            <Link to="/register">
                <button className="home-button">Sign Up</button>
            </Link>
            <Link to="/login">
                <button className="home-button">Sign in</button>
            </Link>
        </div>
    </div>
    );
}

export default Home;