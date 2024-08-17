import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const token = await response.text();

        if(response.ok) {
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.sub;

            console.log("Decoded email:", userEmail);
            dispatch(setUser({email: userEmail}));

            localStorage.setItem('token', token);
            localStorage.setItem('email', userEmail);

            setMessage('로그인 성공');
            navigate('/main');
        }
        else {
            setMessage('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Sing In</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;
