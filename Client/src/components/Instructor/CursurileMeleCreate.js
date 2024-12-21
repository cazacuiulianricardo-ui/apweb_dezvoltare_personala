import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CursurileMeleCreate.css';

const CursurileMeleCreate = () => {
    const { auth } = useContext(AuthContext);
    const [cursuri, setCursuri] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMyCreatedCourses = async () => {
            try {
                const response = await axiosInstance.get('/cursuri/mele-create');
                setCursuri(response.data);
                setErrorMessage('');
            } catch (error) {
                console.error('Eroare la obținerea cursurilor create:', error);
                setErrorMessage('Nu s-au putut încărca cursurile create.');
                toast.error('Nu s-au putut încărca cursurile create.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyCreatedCourses();
    }, [auth.token]);

    if (loading) {
        return <div>Se încarcă cursurile create...</div>;
    }

    return (
        <div className="cursurile-mele-create">
            <h1>Cursurile Mele Create</h1>
            {errorMessage && <p className="eroare">{errorMessage}</p>}
            {cursuri.length > 0 ? (
                <ul className="cursuri-list">
                    {cursuri.map((curs) => (
                        <li key={curs.idCurs} className="curs-item">
                            <h3>{curs.titlu}</h3>
                            <p>{curs.descriere}</p>
                            <p>Nivel: {curs.nivelDificultate}</p>
                            <p>Data Începere: {new Date(curs.dataIncepere).toLocaleDateString()}</p>
                            <p>Data Finalizare: {new Date(curs.dataFinalizare).toLocaleDateString()}</p>
                            <div className="curs-actions">
                                <Link to={`/instructor/cursuri/${curs.idCurs}`} className="view-details-btn">
                                    Vizualizează Detalii
                                </Link>
                                <Link to={`/cursuri/${curs.idCurs}/edit`} className="edit-btn">
                                    Editează
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu ai creat niciun curs în acest moment.</p>
            )}
        </div>
    );
};

export default CursurileMeleCreate;
