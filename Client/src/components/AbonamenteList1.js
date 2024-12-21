import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AbonamenteList1 = () => {
  const [abonamente, setAbonamente] = useState([]);

  useEffect(() => {
    
    const fetchAbonamente = async () => {
      try {
        const response = await axios.get('/abonamente');
        setAbonamente(response.data);
      } catch (error) {
        alert(error.response?.data?.message || 'Eroare la obținerea abonamentelor.');
      }
    };
    fetchAbonamente();
  }, []);

  return (
    <div>
      <h1>Abonamente disponibile</h1>
      <div>
        {abonamente.map((abonament) => (
          <div key={abonament.idAbonament}>
            <h2>{abonament.tip}</h2>
            <p>Pret: {abonament.pret} RON</p>
            <p>{abonament.drepturi}</p>
            <button onClick={() => handlePrevizualizare(abonament.idAbonament)}>Previzualizează cursurile</button>
            <button onClick={() => handleAbonare(abonament.idAbonament)}>Aplica pentru abonament</button>
          </div>
        ))}
      </div>
    </div>
  );

  function handlePrevizualizare(idAbonament) {
    
  }

  function handleAbonare(idAbonament) {
    const token = localStorage.getItem('token');
    if (token) {
   
      axios.post('/abonamente/' + idAbonament + '/subscribe', { token })
        .then(response => {
          alert('Te-ai abonat cu succes!');
        })
        .catch(error => {
          alert(error.response?.data?.message || 'Eroare la abonare.');
        });
    } else {
      alert('Te rugăm să te autentifici înainte de a aplica.');
    }
  }
};

export default AbonamenteList1;
