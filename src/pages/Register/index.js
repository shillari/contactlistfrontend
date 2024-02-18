import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo_small_cropped.png';

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
    async function registerUser(e) {
        e.preventDefault();

        const data = {
            firstname,
            lastname,
            email,
            password
        };

        localStorage.removeItem('token');

        try {
            const response = await api.post('auth/register', data)
            const {token, refreshToken} = response.data;

            alert(`User created!`);
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('email', data.email);
            localStorage.setItem('firstname', data.firstname);
            navigate('/contacts');
        } catch(error) {
            console.log(error);
            if (error.response.status === 409) {
                alert(`User already has an account!`);
            }
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Contakts" />
                    <h1>Sign up</h1>
                    <p>Sign up to start adding yours Contakts! 
                        <br />Meow =^^=</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#3C88A3" />
                        Back to login
                    </Link>
                </section>
                <form onSubmit={registerUser}>
                    <input maxLength={100}
                        placeholder="first name"
                        value={firstname} 
                        onChange={e => setFirstname(e.target.value)} 
                    />
                    <input maxLength={100}
                        placeholder="last name"
                        value={lastname} 
                        onChange={e => setLastname(e.target.value)} 
                    />
                    <input maxLength={100}
                        type="email" 
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
                </form>
            </div>
        </div>
    );
}