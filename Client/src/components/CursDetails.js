import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

const CursDetails = () => {
    const { id } = useParams();
    const [curs, setCurs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurs = async () => {
            try {
                const response = await fetch(`http://localhost:7500/cursuri/${id}`);
                if (!response.ok) throw new Error('Eroare la încărcarea detaliilor cursului.');
                const data = await response.json();
                setCurs(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCurs();
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!curs) return <p>Se încarcă...</p>;

    return (
        <div className="container">
            <h2>Detalii Curs</h2>
            <p>Titlu: {curs.titlu}</p>
            <p>Descriere: {curs.descriere}</p>
            <p>Data Începerii: {new Date(curs.dataIncepere).toLocaleDateString()}</p>
            <p>Instructor: {curs.instructor?.nume || 'N/A'}</p>
            <Link to={`/cursuri/${id}/edit`}>Editează</Link>
        </div>
    );
};

export default CursDetails;
