import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; 

const UtilizatoriList = () => {
    const [utilizatori, setUtilizatori] = useState([]);

    const [error, setError] = useState(null); 

useEffect(() => {
    const fetchUtilizatori = async () => {
        try {
            const response = await fetch('http://localhost:7500/utilizatori');
            if (!response.ok) { 
                const text = await response.text(); 
                throw new Error(`Network response was not ok: ${text}`);
            }
            const data = await response.json();
            setUtilizatori(data);
        } catch (error) {
            console.error('Eroare la obținerea utilizatorilor:', error);
            setError('Eroare la obținerea utilizatorilor'); 
        }
    };
    
    fetchUtilizatori();
}, []);

return (
    <div className="container">
        <h2>Lista Utilizatori</h2>
        {error && <p className="error">{error}</p>} {/* ...  */}
        <ul>
            {utilizatori.map(utilizator => (
                <li key={utilizator.idUtilizator}>
                    {utilizator.nume} - <Link to={`/utilizatori/${utilizator.idUtilizator}`}>Detalii</Link>
                </li>
            ))}
        </ul>
        <Link to="/utilizatori/create">Adaugă Utilizator</Link>
    </div>
);

};

export default UtilizatoriList;
