import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AbonamenteList = () => {
  const [abonamente, setAbonamente] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbonamente = async () => {
      try {
        const response = await fetch('http://localhost:7500/abonamente');
        if (!response.ok) {
          throw new Error('Eroare la obținerea abonamentelor');
        }
        const data = await response.json();
        setAbonamente(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAbonamente();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Ești sigur că dorești să ștergi acest abonament?')) return;

    try {
      const response = await fetch(`http://localhost:7500/abonamente/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Eroare la ștergerea abonamentului');
      }
      setAbonamente(abonamente.filter((abonament) => abonament.idAbonament !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Lista Abonamente</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {abonamente.map((abonament) => (
          <li key={abonament.idAbonament}> {/* ...*/}
            <strong>{abonament.tip}</strong> - {abonament.pret} lei
            <p><strong>Drepturi:</strong> {abonament.drepturi}</p>
            <button onClick={() => handleDelete(abonament.idAbonament)}>Șterge</button>
          </li>
        ))}
      </ul>
      <Link to="/abonamente/create">Adaugă Abonament</Link>
    </div>
  );
};

export default AbonamenteList;
