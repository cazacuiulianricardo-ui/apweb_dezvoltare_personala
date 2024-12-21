import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CursCreate = () => {
    const [titlu, setTitlu] = useState('');
    const [descriere, setDescriere] = useState('');
    const [dataIncepere, setDataIncepere] = useState('');
    const [dataFinalizare, setDataFinalizare] = useState('');
    const [durata, setDurata] = useState('');
    const [nivelDificultate, setNivelDificultate] = useState('începător');
    const [idInstructor, setIdInstructor] = useState('');
    const [utilizatori, setUtilizatori] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchUtilizatori = async () => {
            try {
                const response = await fetch('http://localhost:7500/utilizatori');
                const data = await response.json();
                setUtilizatori(data);
            } catch (error) {
                console.error('Eroare la obținerea utilizatorilor:', error);
            }
        };

        fetchUtilizatori();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7500/cursuri', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    titlu,
                    descriere,
                    dataIncepere,
                    dataFinalizare,
                    durata,
                    nivelDificultate,
                    idInstructor
                }),
            });

            if (response.ok) {
                navigate('/cursuri');
            } else {
                const errorData = await response.json();
                console.error('Eroare la crearea cursului:', errorData);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Eroare la crearea cursului:', error);
            alert('A apărut o eroare la crearea cursului!');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Adaugă Curs</h2>
                <input placeholder="Titlu" value={titlu} onChange={(e) => setTitlu(e.target.value)} required />
                <textarea placeholder="Descriere" value={descriere} onChange={(e) => setDescriere(e.target.value)} />
                <input type="date" value={dataIncepere} onChange={(e) => setDataIncepere(e.target.value)} required />
                <input type="date" value={dataFinalizare} onChange={(e) => setDataFinalizare(e.target.value)} required />
                <input type="number" placeholder="Durata" value={durata} onChange={(e) => setDurata(e.target.value)} required />
                
                <select value={nivelDificultate} onChange={(e) => setNivelDificultate(e.target.value)} required>
                    <option value="începător">Începător</option>
                    <option value="avansat">Avansat</option>
                </select>

                {/* .... */}
                <select value={idInstructor} onChange={(e) => setIdInstructor(e.target.value)} required>
                    <option value="">Selectează instructor</option>
                    {utilizatori.map((utilizator) => (
                        <option key={utilizator.idUtilizator} value={utilizator.idUtilizator}>
                            {utilizator.nume} {utilizator.prenume}
                        </option>
                    ))}
                </select>

                <button type="submit">Salvează</button>
            </form>
        </div>
    );
};

export default CursCreate;
