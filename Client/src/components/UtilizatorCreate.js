import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const UtilizatorCreate = () => {
    const [nume, setNume] = useState('');
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [tipUtilizator, setTipUtilizator] = useState('client');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:7500/utilizatori', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nume, email, parola, tipUtilizator }),
            });
            navigate('/utilizatori');
        } catch (error) {
            console.error('Eroare la crearea utilizatorului:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Adaugă Utilizator</h2>
                <input placeholder="Nume" value={nume} onChange={(e) => setNume(e.target.value)} required />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input placeholder="Parola" value={parola} onChange={(e) => setParola(e.target.value)} required />
                <select value={tipUtilizator} onChange={(e) => setTipUtilizator(e.target.value)}>
                    <option value="client">Client</option>
                    <option value="instructor">Instructor</option>
                </select>
                <button type="submit">Salvează</button>
            </form>
        </div>
    );
};

export default UtilizatorCreate;
