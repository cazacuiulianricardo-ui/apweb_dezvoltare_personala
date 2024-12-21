import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

const CursEdit = () => {
    const { id } = useParams();
    const [titlu, setTitlu] = useState('');
    const [descriere, setDescriere] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurs = async () => {
            try {
                const response = await fetch(`http://localhost:7500/cursuri/${id}`);
                const data = await response.json();
                setTitlu(data.titlu);
                setDescriere(data.descriere);
            } catch (error) {
                console.error('Eroare la încărcarea cursului:', error);
            }
        };
        fetchCurs();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:7500/cursuri/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titlu, descriere }),
            });
            navigate(`/cursuri/${id}`);
        } catch (error) {
            console.error('Eroare la actualizarea cursului:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Editează Curs</h2>
                <input placeholder="Titlu" value={titlu} onChange={(e) => setTitlu(e.target.value)} required />
                <textarea placeholder="Descriere" value={descriere} onChange={(e) => setDescriere(e.target.value)} />
                <button type="submit">Actualizează</button>
            </form>
        </div>
    );
};

export default CursEdit;
