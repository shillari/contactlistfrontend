import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import NewContact from './pages/NewContact';

export default function Routs() {
    return (
        <BrowserRouter>
            <Routes>
                { /* 
                    If I want to access my routes, I have to use 'exact'
                    to not interfer with other routes.
                */}
                <Route path="/" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contact/new" element={<NewContact />} />
            </Routes>
        </BrowserRouter>
    );
}