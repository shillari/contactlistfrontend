import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo_small_cropped.png';

export default function NewContact () {
    const email = localStorage.getItem(`email`);
    const [name, setName] = useState('');
    const [emailcontact, setEmailcontact] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const navigate = useNavigate();

    async function handleAddContact(e) {
        e.preventDefault();

        const data = {
            contactName: name,
            contactEmail: emailcontact,
            phoneOne: phone1,
            phoneTwo: phone2
        }

        try {
            await api.post('contacts/contact', data, {
                params: {
                    "email": email
                }
            });
            navigate('/contacts');
        } catch(error) {
            console.log(error);
            if (error.response !== null && error.response.status === 409) {
                alert(`Contact already exists!`);
            }
        }
    }

    return (
        <div className="newcontact-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Contakts" />
                    <h1>Add contakt</h1>

                    <Link className="back-link" to="/contacts">
                        <FiArrowLeft size={16} color="#3C88A3" />
                        Back to home
                    </Link>
                </section>
                <form onSubmit={handleAddContact}>
                    <input maxLength={100}
                        placeholder="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input maxLength={100}
                        type="email" 
                        placeholder="email" 
                        value={emailcontact}
                        onChange={e => setEmailcontact(e.target.value)}
                    />
                    <input maxLength={50}
                        type="phone" 
                        placeholder="phone 1"
                        value={phone1}
                        onChange={e => setPhone1(e.target.value)}
                    />
                    <input maxLength={50}
                        type="phone" 
                        placeholder="phone 2" 
                        value={phone2}
                        onChange={e => setPhone2(e.target.value)}
                    />
                    <button className="button" type="submit">Enter</button>
                </form>
            </div>
        </div>
    );
}