import React, { useState, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdaugaCursNou = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titlu: '',
        descriere: '',
        dataIncepere: '',
        dataFinalizare: '',
        durata: '',
        nivelDificultate: 'începător'
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            setErrorMessage('Utilizator neautentificat.');
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/cursuri/create', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccessMessage('Curs creat cu succes!');
            setErrorMessage('');
            navigate('/instructor/cursurile-mele-create'); 
        } catch (error) {
            console.error('Eroare la crearea cursului:', error);
            setErrorMessage('A apărut o eroare la crearea cursului.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Adaugă un Curs Nou</h1>
            {successMessage && <p className="succes">{successMessage}</p>}
            {errorMessage && <p className="eroare">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="titlu"
                    placeholder="Titlu"
                    value={formData.titlu}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="descriere"
                    placeholder="Descriere"
                    value={formData.descriere}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dataIncepere"
                    placeholder="Data Începere"
                    value={formData.dataIncepere}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dataFinalizare"
                    placeholder="Data Finalizare"
                    value={formData.dataFinalizare}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="durata"
                    placeholder="Durata (ore)"
                    value={formData.durata}
                    onChange={handleChange}
                    required
                />
                <select name="nivelDificultate" value={formData.nivelDificultate} onChange={handleChange}>
                    <option value="începător">Începător</option>
                    <option value="avansat">Avansat</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creare Curs...' : 'Creare Curs'}
                </button>
            </form>
        </div>
    );
};

export default AdaugaCursNou;
