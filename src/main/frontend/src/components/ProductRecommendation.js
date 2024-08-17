import React, { useState } from 'react';
import { searchProducts, getRecommendation, addFavoriteProduct  } from '../service/apiService';
import '../css/ProductRecommendation.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const ProductRecommendation = () => {
    const [style, setStyle] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [products, setProducts] = useState([]);
    const email = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function cleanTitle(title) {
        return title.replace(/<\/?b>/g, '');
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const rec = await getRecommendation(style);
        setRecommendation(rec);

        const response = await searchProducts(rec);
        console.log(response);
        setProducts(response.items);
    };

    const handleFavorite = async (product) => {
        await addFavoriteProduct(product, email);
        alert("상품이 찜 목록에 추가되었습니다.");
    };

    const shareOnTwitter = (url) => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check+this+out!`;
        window.open(twitterUrl, 'twitter-share-dialog', 'width=800,height=600');
    };

    const shareOnKakao = (product) => {
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: product.title,
                    description: `가격: ${product.lprice}원`,
                    imageUrl: product.image,
                    link: {
                        mobileWebUrl: product.link,
                        webUrl: product.link,
                    },
                },
                buttons: [
                    {
                        title: '상품보기',
                        link: {
                            mobileWebUrl: product.link,
                            webUrl: product.link,
                        },
                    },
                ],
            });
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
        <div>
            <header className="header">
                <div className="logo" onClick={navigateTomain}>MATEMALL</div>
                 <nav className="nav-menu">
                    <button className="nav-button" onClick={navigateToSearch}>상품 추천</button>
                    <button className="nav-button" onClick={navigateToFavorites}>❤️ 찜</button>
                    <button className="nav-button logout" onClick={handleLogout}>Logout</button>
                 </nav>
            </header>

            <h2 className="tile1">원하는 스타일을 찾아보세요 ☘</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    placeholder="Enter product style"
                />
                <button type="submit">Search</button>
            </form>
            <div>
                <h3 className="tile1">추천 스타일 : {recommendation}</h3>
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.productId} className="product-item">
                            <img src={product.image} alt={product.title} />
                            <p className="tile1">{cleanTitle(product.title)}</p>
                            <p className="tile1">{product.lprice}원</p>
                            <a href={product.link} target="_blank" rel="noopener noreferrer" className="tile1">상품보기</a>
                            <button onClick={() => handleFavorite(product)} className="favorite-button tile1">
                                <img
                                    src="img/heart.png"
                                    alt="찜하기"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </button>
                            <button onClick={() => shareOnTwitter(product.link)} className="social-button tile1">
                                <img
                                    src="img/twitter.png"
                                    alt="트위터 공유"
                                    style={{ width: '20px', height: '20px', border: 'none', background: 'none' }}
                                />
                            </button>
                            <button onClick={() => shareOnKakao(product)} className="social-button tile1">
                                 <img
                                    src="img/kakao.png"
                                    alt="카카오톡 공유"
                                    style={{ width: '20px', height: '20px', border: 'none', background: 'none' }}
                                 />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductRecommendation;