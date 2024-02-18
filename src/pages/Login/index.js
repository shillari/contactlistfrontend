import React, {useState} from "react";
import {FiLogIn} from 'react-icons/fi';
import {Link, useNavigate} from 'react-router-dom'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo_small_cropped.png'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('auth/authenticate', {email, password});
            const {token, refreshToken} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('email', email);
            localStorage.setItem('firstname', response.data.firstname);
            navigate('/contacts');
        } catch(error) {
            console.log(error);
            if (error.response.status === 204) {
                alert(`No register found for this email!`);
            }
            if (error.response.status === 403) {
                alert(`User or password invalid!`);
            }
        }
        
    }

    return (
        <div className="login-container">
            <div className="content">
                <section className="form">
                    <img src={logoImg} alt="Contakts" />
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <input maxLength={100} type="email"
                            placeholder="email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <input type="password"
                            placeholder="password"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <button className="button" type="submit">Enter</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#3C88A3" />
                            Sign up
                        </Link>
                    </form>
                </section>
            </div>
        </div>
    )
}