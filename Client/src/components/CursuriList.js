import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const CursuriList = () => {
    const [cursuri, setCursuri] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCursuri = async () => {
            try {
                const response = await fetch('http://localhost:7500/cursuri');
                if (!response.ok) throw new Error('Eroare la încărcarea cursurilor.');
                const data = await response.json();
                setCursuri(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCursuri();
    }, []);

    return (
        <div className="container">
            <h2>Lista Cursuri</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {cursuri.map((curs) => (
                    <li key={curs.idCurs}>
                        {curs.titlu} - <Link to={`/cursuridetails/${curs.idCurs}`}>Detalii</Link>
                    </li>
                ))}
            </ul>
            <Link to="/cursuricreate/create">Adaugă Curs</Link>
        </div>
    );
};

export default CursuriList;
