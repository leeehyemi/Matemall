import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    console.log(email);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        dispatch(clearUser());
        navigate('/login');
        console.log('Logged out');
    };

    const navigateToSearch = () => {
        navigate('/search');
    };

    const navigateToFavorites = () => {
        navigate('/favorites');
    };

    return (
        <div className="main-page">
            <header className="header">
                <div className="logo">MATEMALL</div>
                <nav className="nav-menu">
                    <button className="nav-button" onClick={navigateToSearch}>상품 추천</button>
                    <button className="nav-button" onClick={navigateToFavorites}>❤️ 찜</button>
                    <button className="nav-button logout" onClick={handleLogout}>Logout</button>
                </nav>
            </header>
            <div className="main-content">
                <div className="content-wrapper">
                    <img
                        src="img/mate.png"
                        alt="mainimage"
                    />
                    <div>
                        <h1>당신의 Shopping mate</h1>
                        <p>원하는 상품을 추천받아보세요</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
