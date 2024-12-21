import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'; 

const UtilizatorEdit = () => {
    const { id } = useParams();
    const [nume, setNume] = useState('');
    const [email, setEmail] = useState('');
    const [tipUtilizator, setTipUtilizator] = useState('client');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUtilizator = async () => {
            try {
                const response = await fetch(`http://localhost:7500/utilizatori/${id}`);
                const data = await response.json();
                setNume(data.nume);
                setEmail(data.email);
                setTipUtilizator(data.tipUtilizator);
            } catch (error) {
                console.error('Eroare la obținerea utilizatorului:', error);
            }
        };
        fetchUtilizator();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:7500/utilizatori/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nume, email, tipUtilizator }),
            });
            navigate(`/utilizatori/${id}`);
        } catch (error) {
            console.error('Eroare la actualizarea utilizatorului:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Editează Utilizator</h2>
                <input placeholder="Nume" value={nume} onChange={(e) => setNume(e.target.value)} required />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <select value={tipUtilizator} onChange={(e) => setTipUtilizator(e.target.value)}>
                    <option value="client">Client</option>
                    <option value="instructor">Instructor</option>
                </select>
                <button type="submit">Actualizează</button>
            </form>
        </div>
    );
};

export default UtilizatorEdit;
