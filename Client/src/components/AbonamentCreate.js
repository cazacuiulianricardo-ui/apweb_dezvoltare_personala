import React, { useState } from 'react';
import axios from 'axios';

const AbonamentCreate = () => {
    const [formData, setFormData] = useState({
        tip: '',
        pret: '',
        drepturi: '',
        dataInceperii: '',
        dataExpirarii: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            const response = await axios.post('/abonamente', formData);
            alert('Abonament creat cu succes!');
        } catch (error) {
            alert(error.response?.data?.message || 'Eroare la crearea abonamentului.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Creare Abonament</h2>
            <input type="text" name="tip" placeholder="Tip Abonament" onChange={handleChange} required />
            <input type="number" name="pret" placeholder="Preț" onChange={handleChange} required />
            <textarea name="drepturi" placeholder="Drepturi asociate" onChange={handleChange} required />
            <input type="date" name="dataInceperii" onChange={handleChange} required />
            <input type="date" name="dataExpirarii" onChange={handleChange} required />
            <button type="submit">Creează Abonament</button>
        </form>
    );
};

export default AbonamentCreate;
