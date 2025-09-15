import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Abonamente = () => {
  
  const [abonamentActiv, setAbonamentActiv] = useState(null);
  const [mesajSucces, setMesajSucces] = useState('');
  const [mesajEroare, setMesajEroare] = useState('');
  const [abonamentSelectat, setAbonamentSelectat] = useState(null);


  const abonamente = [
    { id: 1, nume: 'Standard', descriere: 'Acces la cursuri pentru începători', tip: 'Standard', pret: 50 },
    { id: 2, nume: 'Premium', descriere: 'Acces la cursuri pentru începători și avansați', tip: 'Premium', pret: 100 },
    { id: 3, nume: 'Anual', descriere: 'Acces complet pentru un an la toate cursurile', tip: 'Anual', pret: 500 },
  ];



  useEffect(() => {
    const fetchAbonamentActiv = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
          setMesajEroare('Utilizator neautentificat.');
          return;
        }

        const response = await axios.get('http://localhost:7500/abonamente/activ', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAbonamentActiv(response.data);
        setMesajSucces('');
        setMesajEroare('');
      } catch (error) {
        console.error(
          'Eroare Axios:',
          error.response ? error.response.data : error.message
        );
        setMesajEroare(
          error.response
            ? error.response.data.message
            : 'Nu s-a putut obține abonamentul activ.'
        );
        setMesajSucces('');
      }
    };

    fetchAbonamentActiv();
  }, []);

  const handleSelectAbonament = (id) => {
    const abonament = abonamente.find((item) => item.id === id);
    setAbonamentSelectat(abonament);
  };


  const handleAbonare = async () => {
    if (!abonamentSelectat) return;

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setMesajEroare('Te rog să te autentifici.');
        return;
      }

      const response = await axios.post(
        'http://localhost:7500/abonamente/subscribe',
        {
          tip: abonamentSelectat.tip,
          pret: abonamentSelectat.pret,
          drepturi: abonamentSelectat.descriere,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMesajSucces('Te-ai abonat cu succes!');
      setMesajEroare('');
      setAbonamentActiv(response.data.abonament);
    } catch (error) {
      console.error('Eroare la abonare:', error.response?.data || error.message);
      setMesajEroare('A apărut o eroare la abonare!');
      setMesajSucces('');
    }
  };


  const handleUpgradeAbonament = async (tipNou) => {
    if (!abonamentActiv) return;

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setMesajEroare('Te rog să te autentifici.');
        return;
      }

      const response = await axios.put(
        'http://localhost:7500/abonamente/upgrade',
        { tipNou },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAbonamentActiv(response.data.abonament);
      setMesajSucces('Abonamentul a fost actualizat cu succes!');
      setMesajEroare('');
    } catch (error) {
      console.error('Eroare la upgrade:', error.response?.data || error.message);

      if (
        error.response?.data?.error ===
        'Abonamentul selectat este același cu cel curent.'
      ) {
        setMesajEroare('Ai selectat același tip de abonament pe care îl ai deja.');
      } else {
        setMesajEroare(
          error.response?.data?.message ||
            'A apărut o eroare la actualizarea abonamentului.'
        );
      }

      setMesajSucces('');
    }
  };


  const handleDowngradeAbonament = async (tipNou) => {
    if (!abonamentActiv) return;

    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setMesajEroare('Te rog să te autentifici.');
        return;
      }

      const response = await axios.put(
        'http://localhost:7500/abonamente/switch',
        { tipNou },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAbonamentActiv(response.data.abonament);
      setMesajSucces('Abonamentul a fost modificat cu succes!');
      setMesajEroare('');
    } catch (error) {
      console.error('Eroare la downgrade:', error.response?.data || error.message);

      if (
        error.response?.data?.error ===
        'Abonamentul selectat este același cu cel curent.'
      ) {
        setMesajEroare('Ai selectat același tip de abonament pe care îl ai deja.');
      } else {
        setMesajEroare(
          error.response?.data?.message ||
            'A apărut o eroare la modificarea abonamentului.'
        );
      }

      setMesajSucces('');
    }
  };

  return (
    <div className="abonamente">
      <h1>Abonamente</h1>

      {mesajSucces && <p className="succes">{mesajSucces}</p>}
      {mesajEroare && <p className="eroare">{mesajEroare}</p>}

      {abonamentActiv ? (
        <div className="abonament-activ">
          <h3>Abonamentul tău activ: {abonamentActiv.tip}</h3>
          <p>Data începere: {new Date(abonamentActiv.dataInceperii).toLocaleDateString()}</p>
          <p>Data expirare: {new Date(abonamentActiv.dataExpirarii).toLocaleDateString()}</p>

          {abonamentActiv.tip === 'Standard' && (
            <>
              {/*  */}
              <button onClick={() => handleUpgradeAbonament('Premium')}>
                Upgrade la Premium
              </button>
              <button onClick={() => handleUpgradeAbonament('Anual')}>
                Upgrade la Anual
              </button>
            </>
          )}

          {abonamentActiv.tip === 'Premium' && (
            <>
              {/*  */}
              <button onClick={() => handleUpgradeAbonament('Anual')}>
                Upgrade la Anual
              </button>
              <button onClick={() => handleDowngradeAbonament('Standard')}>
                Downgrade la Standard
              </button>
            </>
          )}

          {abonamentActiv.tip === 'Anual' && (
            <>
              {/* .... */}
              <button onClick={() => handleDowngradeAbonament('Premium')}>
                Downgrade la Premium
              </button>
              <button onClick={() => handleDowngradeAbonament('Standard')}>
                Downgrade la Standard
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="abonamente-lista">
          <h3>Selectează un abonament pentru a te abona:</h3>
          {abonamente.map((abonament) => (
            <div
              key={abonament.id}
              className="abonament-item"
              onClick={() => handleSelectAbonament(abonament.id)}
              style={{
                border:
                  abonamentSelectat?.id === abonament.id
                    ? '2px solid blue'
                    : '1px solid gray',
                padding: '10px',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              <h2>{abonament.nume}</h2>
              <p>{abonament.descriere}</p>
              <p>Pret: {abonament.pret} RON</p>
            </div>
          ))}

          {abonamentSelectat && (
            <div className="abonament-detalii">
              <h3>Detalii abonament: {abonamentSelectat.nume}</h3>
              <p>{abonamentSelectat.descriere}</p>
              <p>Preț: {abonamentSelectat.pret} RON</p>
              <button onClick={handleAbonare}>Abonează-te</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Abonamente;
