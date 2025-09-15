import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import PDFViewer from './PDFViewer';
import './CourseDetails.css';

const StudentCourseDetails = () => {
    const { id } = useParams(); // ID-ul cursului
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axiosInstance.get(`/cursuri/${id}`);
                setCourse(response.data);
                setError('');
            } catch (err) {
                console.error('Eroare la obținerea detaliilor cursului:', err);
                setError(err.response?.data?.message || 'Eroare la încărcarea detaliilor cursului.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) {
        return <div>Se încarcă detaliile cursului...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:7500';

    return (
        <div className="course-details">
            <h1>{course.titlu}</h1>
            <p>{course.descriere}</p>
            <p><strong>Durată:</strong> {course.durata} ore</p>
            <p><strong>Dificultate:</strong> {course.nivelDificultate}</p>
            <p><strong>Instructor:</strong> {course.instructor.nume}</p>
            <p><strong>Data Începere:</strong> {new Date(course.dataIncepere).toLocaleDateString()}</p>
            <p><strong>Data Finalizare:</strong> {new Date(course.dataFinalizare).toLocaleDateString()}</p>

            <h2>Module</h2>
            {course.modules && course.modules.length > 0 ? (
                course.modules.map(module => (
                    <div key={module.idModule} className="module">
                        <h3>{module.nume}</h3>
                        <h3>{module.descriere}</h3>
                        <div className="resources">
                            <h4>Videoclipuri</h4>
                            {module.videos && module.videos.length > 0 ? (
                                module.videos.map(video => (
                                    <VideoPlayer 
                                        key={video.idVideo} 
                                        url={`${backendURL}${video.url}`} 
                                        title={video.titlu} 
                                    />
                                ))
                            ) : (
                                <p>Nu există videoclipuri.</p>
                            )}

                            <h4>Fișiere PDF</h4>
                            {module.pdfs && module.pdfs.length > 0 ? (
                                module.pdfs.map(pdf => (
                                    <PDFViewer 
                                        key={pdf.idPDF} 
                                        url={`${backendURL}${pdf.url}`} 
                                        title={pdf.titlu} 
                                    />
                                ))
                            ) : (
                                <p>Nu există fișiere PDF.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>Nu există module pentru acest curs.</p>
            )}
        </div>
    );
};

export default StudentCourseDetails;