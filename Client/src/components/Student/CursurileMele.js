import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
import './CursurileMele.css';

const CursurileMele = () => {
    const [cursuri, setCursuri] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mesajEroare, setMesajEroare] = useState('');

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await axiosInstance.get('/abonamente/cursurile-mele', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
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
        <div className="cursurile-mele">
            <h1>Cursurile Mele</h1>
            {mesajEroare && <p className="eroare">{mesajEroare}</p>}
            {cursuri.length > 0 ? (
                <ul className="cursuri-list">
                    {cursuri.map((curs) => (
                        <li key={curs.idCurs} className="curs-item">
                            <h3>{curs.titlu}</h3>
                            <p>{curs.descriere}</p>
                            <p>Nivel: {curs.nivelDificultate}</p>
                            <p>Instructor: {curs.instructor.nume}</p>
                            <Link to={`/cursurile-mele/${curs.idCurs}`} className="view-details-btn">
                                Vizualizează Detalii
                            </Link>
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