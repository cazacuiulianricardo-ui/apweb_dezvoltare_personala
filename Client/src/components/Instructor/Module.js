import React, { useState, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import AddResourceForm from './AddResourceForm';
import './Module.css';

const Module = ({ module, onUpdate, onDelete }) => {
    const { auth } = useContext(AuthContext);
    const [showAddResource, setShowAddResource] = useState(false);
    const [showEditModule, setShowEditModule] = useState(false);
    const [moduleName, setModuleName] = useState(module.nume);
    const [loading, setLoading] = useState(false);
    git rm --cached
    const handleDeleteModule = async () => {
        if (!window.confirm('Ești sigur că dorești să ștergi acest modul?')) return;

        setLoading(true);
        try {
            await axiosInstance.delete(`/modules/modules/${module.idModule}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            onDelete(module.idModule);
            toast.success('Modul șters cu succes.');
        } catch (error) {
            console.error('Eroare la ștergerea modulului:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la ștergerea modulului.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateModule = async () => {
        if (!moduleName.trim()) {
            toast.error('Numele modulului nu poate fi gol.');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put(`/modules/modules/${module.idModule}`, { nume: moduleName }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            onUpdate(response.data);
            setShowEditModule(false);
            toast.success('Modul actualizat cu succes.');
        } catch (error) {
            console.error('Eroare la actualizarea modulului:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la actualizarea modulului.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="module">
            <div className="module-header">
                {showEditModule ? (
                    <>
                        <input
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            className="module-input"
                        />
                        <button onClick={handleUpdateModule} className="save-btn" disabled={loading}>Salvează</button>
                        <button onClick={() => setShowEditModule(false)} className="cancel-btn" disabled={loading}>Anulează</button>
                    </>
                ) : (
                    <>
                        <h3>{module.nume}</h3>
                        <div>
                            <button onClick={() => setShowEditModule(true)} className="edit-btn">Editează</button>
                            <button onClick={handleDeleteModule} className="delete-btn" disabled={loading}>Șterge</button>
                        </div>
                    </>
                )}
            </div>
            <div className="module-resources">
                <h4>Videoclipuri</h4>
                {module.videos && module.videos.length > 0 ? (
                    <ul>
                        {module.videos.map(video => (
                            <li key={video.idVideo}>
                                <a href={video.url} target="_blank" rel="noopener noreferrer">{video.titlu}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nu există videoclipuri.</p>
                )}

                <h4>Fișiere PDF</h4>
                {module.pdfs && module.pdfs.length > 0 ? (
                    <ul>
                        {module.pdfs.map(pdf => (
                            <li key={pdf.idPDF}>
                                <a href={pdf.url} target="_blank" rel="noopener noreferrer">{pdf.titlu}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nu există fișiere PDF.</p>
                )}
            </div>
            <button onClick={() => setShowAddResource(true)} className="add-resource-btn">
                Adaugă Resursă
            </button>
            {showAddResource && (
                <AddResourceForm
                    moduleId={module.idModule}
                    onClose={() => setShowAddResource(false)}
                    onAdd={() => setShowAddResource(false)}
                />
            )}
        </div>
    );
};

export default Module;
