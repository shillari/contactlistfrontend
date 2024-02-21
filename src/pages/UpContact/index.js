import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo_small_cropped.png';

export default function UpContact () {

    const email = localStorage.getItem(`email`);
    const contactId = localStorage.getItem(`contactId`);
    const [name, setName] = useState('');
    const [emailcontact, setEmailcontact] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('contacts/contact', {
            params: {
                email: email,
                contactId: contactId
            }
        }).then(response => {
            setName(response.data.contactName);
            setEmailcontact(response.data.contactEmail);
            setPhone1(response.data.phoneOne);
            setPhone2(response.data.phoneTwo);
        })
    }, [email, contactId]);

    async function handleUpdateContact(e) {
        e.preventDefault();

        const data = {
            contactId: contactId,
            contactName: name,
            contactEmail: emailcontact,
            phoneOne: phone1,
            phoneTwo: phone2
        }

        try {
            await api.put('contacts/contact', data, {
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
                    <h1>Update contakt</h1>

                    <Link className="back-link" to="/contacts">
                        <FiArrowLeft size={16} color="#3C88A3" />
                        Back to contakts
                    </Link>
                </section>
                <form onSubmit={handleUpdateContact}>
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