import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import '../css/Favorites.css';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const email = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`/api/favorites/${email}`);
                setFavorites(response.data);
            } catch (error) {
                console.error("찜 목록을 가져오는데 실패했습니다.", error);
            }
        };

        fetchFavorites();
    }, [email]);

    const fetchRelatedProducts = async (product) => {
        try {
            const response = await axios.get(`/api/search/related`, {
                params: { productTitle: product.title }
            });

            setRelatedProducts(response.data);
            setCurrentProduct(product);
            setShowPopup(true);
        } catch (error) {
            console.error("연관 상품을 가져오는데 실패했습니다.", error);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setCurrentProduct(null);
    };

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

   const navigateTomain = () => {
    navigate('/main');
   };


    return (
        <>
            <header className="header">
                <div className="logo" onClick={navigateTomain}>MATEMALL</div>
                <nav className="nav-menu">
                    <button className="nav-button" onClick={navigateToSearch}>상품 추천</button>
                    <button className="nav-button" onClick={navigateToFavorites}>❤️ 찜</button>
                    <button className="nav-button logout" onClick={handleLogout}>Logout</button>
                </nav>
            </header>

            <div className="favorites-container">
            <h2 className="title2">찜 목록 💬💌</h2>
            <div className="favorites-grid">
                {favorites.map((product, index) => (
                    <div key={index} className="favorite-item">
                        <img src={product.image} alt={product.title || '상품 이미지'} />
                        <p>{product.title ? product.title.replace(/<\/?b>/g, '') : '제목 없음'}</p>
                        <p>{product.lprice ? `${product.lprice}원` : '가격 정보 없음'}</p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">상품보기</a>
                        <button onClick={() => fetchRelatedProducts(product)}>연관 상품 보기</button>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={handlePopupClose}>닫기</button>
                        <h3>{currentProduct?.title.replace(/<\/?b>/g, '')}에 대한 연관 상품</h3>
                        <div className="related-products">
                            {relatedProducts.map((item, idx) => (
                                <div key={idx} className="related-item">
                                    <img src={item.image} alt={item.title || '연관 상품 이미지'} />
                                    <p>{item.title ? item.title.replace(/<\/?b>/g, '') : '제목 없음'}</p>
                                    <p>{item.lprice ? `${item.lprice}원` : '가격 정보 없음'}</p>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">상품보기</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default FavoritesPage;
