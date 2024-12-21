import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles.css'; 

const UtilizatorDetails = () => {
    const { id } = useParams();
    const [utilizator, setUtilizator] = useState(null);

    useEffect(() => {
        const fetchUtilizator = async () => {
            try {
                const response = await fetch(`http://localhost:7500/utilizatori/${id}`);
                const data = await response.json();
                setUtilizator(data);
            } catch (error) {
                console.error('Eroare la obținerea utilizatorului:', error);
            }
        };
        fetchUtilizator();
    }, [id]);

    if (!utilizator) {
        return <div>Se încarcă...</div>;
    }

    return (
        <div className="container">
            <h2>Detalii Utilizator</h2>
            <p>Nume: {utilizator.nume}</p>
            <p>Email: {utilizator.email}</p>
            <p>Tip Utilizator: {utilizator.tipUtilizator}</p>
            <Link to={`/utilizatori/${id}/edit`}>Editează</Link>
        </div>
    );
};

export default UtilizatorDetails;
