import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import './CursurileMeleCreate.css';

const CursurileMeleCreate = () => {
  const { auth } = useContext(AuthContext);
  const [cursuri, setCursuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const [editingCursId, setEditingCursId] = useState(null);  
  const [editingFormData, setEditingFormData] = useState({
    titlu: '',
    descriere: '',
    dataIncepere: '',
    dataFinalizare: '',
    durata: '',
    nivelDificultate: 'începător'
  });

 
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

  const handleStartEdit = (curs) => {
    setEditingCursId(curs.idCurs);
    setEditingFormData({
      titlu: curs.titlu,
      descriere: curs.descriere,
      dataIncepere: curs.dataIncepere.split('T')[0],
      dataFinalizare: curs.dataFinalizare.split('T')[0],
      durata: curs.durata,
      nivelDificultate: curs.nivelDificultate || 'începător',
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async (idCurs) => {
    try {
      const response = await axiosInstance.put(`/cursuri/${idCurs}`, {
        titlu: editingFormData.titlu,
        descriere: editingFormData.descriere,
        dataIncepere: editingFormData.dataIncepere,
        dataFinalizare: editingFormData.dataFinalizare,
        durata: editingFormData.durata,
        nivelDificultate: editingFormData.nivelDificultate
      });
     
      setCursuri((prevCursuri) =>
        prevCursuri.map((c) =>
          c.idCurs === idCurs ? response.data : c
        )
      );
      toast.success('Curs actualizat cu succes!');
      setEditingCursId(null);
    } catch (error) {
      console.error('Eroare la actualizarea cursului:', error);
      toast.error('A apărut o eroare la actualizarea cursului.');
    }
  };


  const handleDelete = async (idCurs) => {
    if (!window.confirm('Ești sigur că dorești să ștergi acest curs?')) return;

    try {
      await axiosInstance.delete(`/cursuri/${idCurs}`);
      setCursuri((prevCursuri) =>
        prevCursuri.filter((c) => c.idCurs !== idCurs)
      );
      toast.success('Curs șters cu succes (inclusiv module și resurse)!');
    } catch (error) {
      console.error('Eroare la ștergerea cursului:', error);
      toast.error('A apărut o eroare la ștergerea cursului.');
    }
  };


  const handleCancelEdit = () => {
    setEditingCursId(null);
  };

  if (loading) {
    return <div>Se încarcă cursurile create...</div>;
  }

  return (
    <div className="cursurile-mele-create">
      <h1>Cursurile Mele Create</h1>
      {errorMessage && <p className="eroare">{errorMessage}</p>}

      {cursuri.length > 0 ? (
        <ul className="cursuri-list">
          {cursuri.map((curs) => {
            //
            if (editingCursId === curs.idCurs) {
              return (
                <li key={curs.idCurs} className="curs-item editing">
                  <h3>Editează Cursul #{curs.idCurs}</h3>
                  <div className="edit-form">
                    <label>Titlu</label>
                    <input
                      type="text"
                      name="titlu"
                      value={editingFormData.titlu}
                      onChange={handleChange}
                    />

                    <label>Descriere</label>
                    <textarea
                      name="descriere"
                      value={editingFormData.descriere}
                      onChange={handleChange}
                    />

                    <label>Data Începere</label>
                    <input
                      type="date"
                      name="dataIncepere"
                      value={editingFormData.dataIncepere}
                      onChange={handleChange}
                    />

                    <label>Data Finalizare</label>
                    <input
                      type="date"
                      name="dataFinalizare"
                      value={editingFormData.dataFinalizare}
                      onChange={handleChange}
                    />

                    <label>Durata (ore)</label>
                    <input
                      type="number"
                      name="durata"
                      value={editingFormData.durata}
                      onChange={handleChange}
                    />

                    <label>Nivel Dificultate</label>
                    <select
                      name="nivelDificultate"
                      value={editingFormData.nivelDificultate}
                      onChange={handleChange}
                    >
                      <option value="începător">Începător</option>
                      <option value="avansat">Avansat</option>
                    </select>

                    <div className="edit-actions">
                      <button onClick={() => handleSave(curs.idCurs)}>
                        Salvează
                      </button>
                      <button onClick={handleCancelEdit}>
                        Anulează
                      </button>
                      <button
                        onClick={() => handleDelete(curs.idCurs)}
                        style={{ backgroundColor: 'red', color: '#fff' }}
                      >
                        Șterge Curs
                      </button>
                    </div>
                  </div>
                </li>
              );
            } else {
              
              return (
                <li key={curs.idCurs} className="curs-item">
                  <h3>{curs.titlu}</h3>
                  <p>{curs.descriere}</p>
                  <p>Nivel: {curs.nivelDificultate}</p>
                  <p>Data Începere: {new Date(curs.dataIncepere).toLocaleDateString()}</p>
                  <p>Data Finalizare: {new Date(curs.dataFinalizare).toLocaleDateString()}</p>

                  <div className="curs-actions">
                    {/*.. */}
                    <Link
                      to={`/instructor/cursuri/${curs.idCurs}`}
                      className="view-details-btn"
                    >
                      Vizualizează Detalii
                    </Link>

                    <button
                      className="edit-btn"
                      onClick={() => handleStartEdit(curs)}
                    >
                      Editează
                    </button>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <p>Nu ai creat niciun curs în acest moment.</p>
      )}
    </div>
  );
};

export default CursurileMeleCreate;
