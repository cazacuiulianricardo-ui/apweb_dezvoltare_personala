import React, { useState, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import './AddResourceForm.css';

const AddResourceForm = ({ moduleId, onClose, onAdd }) => {
    const { auth } = useContext(AuthContext);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [pdfTitle, setPdfTitle] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVideoUpload = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handlePDFUpload = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!videoTitle && !pdfTitle) {
            toast.error('Trebuie să adaugi cel puțin un titlu pentru videoclip sau PDF.');
            return;
        }

        if ((videoTitle && !videoFile) || (pdfTitle && !pdfFile)) {
            toast.error('Fișierul corespunzător titlului este necesar.');
            return;
        }

        setLoading(true);
        try {
        
            if (videoTitle && videoFile) {
                const formData = new FormData();
                formData.append('titlu', videoTitle);
                formData.append('file', videoFile);

                await axiosInstance.post(`/modules/modules/${moduleId}/videos`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                toast.success('Videoclip adăugat cu succes.');
            }

            
            if (pdfTitle && pdfFile) {
                const formData = new FormData();
                formData.append('titlu', pdfTitle);
                formData.append('file', pdfFile);

                await axiosInstance.post(`/modules/modules/${moduleId}/pdfs`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                toast.success('Fișier PDF adăugat cu succes.');
            }

            onAdd();
            onClose();
        } catch (error) {
            console.error('Eroare la adăugarea resursei:', error);
            toast.error(error.response?.data?.message || 'A apărut o eroare la adăugarea resursei.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Adaugă Resursă</h3>
                <form onSubmit={handleSubmit}>
                    <div className="resource-section">
                        <h4>Videoclip</h4>
                        <label htmlFor="videoTitle">Titlu Videoclip:</label>
                        <input
                            type="text"
                            id="videoTitle"
                            value={videoTitle}
                            onChange={(e) => setVideoTitle(e.target.value)}
                        />
                        <label htmlFor="videoFile">Fișier Videoclip:</label>
                        <input
                            type="file"
                            id="videoFile"
                            accept="video/*"
                            onChange={handleVideoUpload}
                        />
                    </div>

                    <div className="resource-section">
                        <h4>Fișier PDF</h4>
                        <label htmlFor="pdfTitle">Titlu PDF:</label>
                        <input
                            type="text"
                            id="pdfTitle"
                            value={pdfTitle}
                            onChange={(e) => setPdfTitle(e.target.value)}
                        />
                        <label htmlFor="pdfFile">Fișier PDF:</label>
                        <input
                            type="file"
                            id="pdfFile"
                            accept="application/pdf"
                            onChange={handlePDFUpload}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-btn" disabled={loading}>Adaugă</button>
                        <button type="button" onClick={onClose} className="cancel-btn" disabled={loading}>Anulează</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddResourceForm;
