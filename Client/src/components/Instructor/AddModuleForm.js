import React, { useState, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import './AddModuleForm.css';

const AddModuleForm = ({ courseId, onClose, onAdd }) => {
    const { auth } = useContext(AuthContext);
    const [moduleName, setModuleName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!moduleName.trim()) {
            toast.error('Numele modulului nu poate fi gol.');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post(`/modules/cursuri/${courseId}/modules`, { nume: moduleName }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            onAdd(response.data);
            toast.success('Modul adăugat cu succes.');
            onClose();
        } catch (error) {
            console.error('Eroare la adăugarea modulului:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la adăugarea modulului.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Adaugă Modul Nou</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="moduleName">Nume Modul:</label>
                    <input
                        type="text"
                        id="moduleName"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit" className="submit-btn" disabled={loading}>Adaugă</button>
                        <button type="button" onClick={onClose} className="cancel-btn" disabled={loading}>Anulează</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModuleForm;
