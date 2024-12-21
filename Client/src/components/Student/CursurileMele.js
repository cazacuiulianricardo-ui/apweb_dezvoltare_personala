import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CursurileMele = () => {
    const [cursuri, setCursuri] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mesajEroare, setMesajEroare] = useState('');

    useEffect(() => {
        const fetchMyCourses = async () => {
            const token = localStorage.getItem('jwt_token'); 
            if (!token) {
                console.error('Token absent! Utilizatorul nu este autentificat.');
                alert('Trebuie să fii autentificat pentru a accesa cursurile.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:7500/abonamente/cursurile-mele', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Răspuns primit:', response.data);
                setCursuri(response.data);
                setMesajEroare('');
            } catch (error) {
                console.error('Eroare la obținerea cursurilor:', error);
                if (error.response) {
                    console.error('Răspuns server:', error.response.data);
                    setMesajEroare(error.response.data.message || 'Eroare la încărcarea cursurilor.');
                } else {
                    setMesajEroare('Eroare la încărcarea cursurilor.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    if (loading) {
        return <div>Se încarcă...</div>;
    }

    return (
        <div>
            <h1>Cursurile Mele</h1>
            {mesajEroare && <p className="eroare">{mesajEroare}</p>}
            {cursuri.length > 0 ? (
                <ul>
                    {cursuri.map((curs) => (
                        <li key={curs.idCurs}>
                            <h3>{curs.titlu}</h3>
                            <p>{curs.descriere}</p>
                            <p>Nivel: {curs.nivelDificultate}</p>
                            <p>Instructor: {curs.instructor.nume}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu ai cursuri disponibile în acest moment.</p>
            )}
        </div>
    );
};

export default CursurileMele;
