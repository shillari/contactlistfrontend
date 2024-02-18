import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo_small_cropped.png';

export default function Contacts() {
    const firstname = localStorage.getItem('firstname');
    const email = localStorage.getItem(`email`);
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        api.get('contacts', {
            params: {
                email: email
            }
        }).then(response => {
            setContacts(response.data);
        })
    }, [email]);

    function handleDeleteContact(contactName) {
        try {
            api.delete('contacts/contact', {
                params: {
                    email: email,
                    contactname: contactName
                }
            });
            setContacts(contacts.filter(contact => contact.contactName !== contactName));
        } catch(error) {
            console.log(error);
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="contacts-container">
            <header>
                <img src={logoImg} alt="Contakts" />
                <span>Welcome, {firstname}</span>
                <Link className="button" to="/contact/new">Add contakt</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower sizer={18} color="#3C88A3" />
                </button>
            </header>

            <h1>Contakts</h1>

            <ul>
                {contacts.map(contact => (
                    <li key={contact.contactName}>
                    <strong>Contact name:</strong>
                    <p>{contact.contactName}</p>
                    <strong>Email:</strong>
                    <p>{contact.contactEmail}</p>
                    <strong>Phone1:</strong>
                    <p>{contact.phoneOne}</p>
                    <strong>Phone2:</strong>
                    <p>{contact.phoneTwo}</p>
                    <button onClick={() =>handleDeleteContact(contact.contactName)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}