import axios from 'axios';

export const getRecommendation = async (style) => {
    const response = await axios.get(`api/recommend?style=${style}`);
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await axios.get(`/api/search?query=${query}`);
    return response.data;
}

export const addFavoriteProduct = async (product, email) => {
    const response = await axios.post('/api/favorites', {
        email,
        productId: product.productId,
        title: product.title,
        link: product.link,
        image: product.image,
        lprice: product.lprice
    });
    return response.data;
};
