import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM from 'react-dom/client'로 수정
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './App';

// createRoot를 사용하여 React 18에 맞게 설정
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

