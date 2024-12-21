import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import VideoPlayer from './VideoPlayer';
import PDFViewer from './PDFViewer';
import './CourseDetails.css';

const CourseDetails = () => {
    const { id } = useParams(); 
    const { auth } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {

                const courseResponse = await axiosInstance.get(`/cursuri/${id}`);
                setCourse(courseResponse.data);

                console.log('Course Data:', courseResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Eroare la obținerea detaliilor cursului:', error);
                setErrorMessage('Nu s-au putut încărca detaliile cursului.');
                toast.error('Nu s-au putut încărca detaliile cursului.');
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) {
        return <div>Se încarcă detaliile cursului...</div>;
    }

    if (errorMessage) {
        return <div className="error-message">{errorMessage}</div>;
    }


    const backendBaseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:7500';

    const buildVideoUrl = (videoUrl) => {
        return `${backendBaseURL}/uploads/videos/${videoUrl}`;
    };

    const buildPdfUrl = (pdfUrl) => {
        return `${backendBaseURL}/uploads/pdfs/${pdfUrl}`;
    };

    return (
        <div className="course-details">
            <h1>{course.titlu}</h1>
            <p>{course.descriere}</p>
            <p>Durată: {course.durata} ore</p>
            <p>Dificultate: {course.nivelDificultate}</p>
            <p>Data Începere: {new Date(course.dataIncepere).toLocaleDateString()}</p>
            <p>Data Finalizare: {new Date(course.dataFinalizare).toLocaleDateString()}</p>

            <h2>Module</h2>
            {course.modules && course.modules.length > 0 ? (
                course.modules.map(module => (
                    <div key={module.idModule} className="module">
                        <h3>{module.nume}</h3>
                        <p>Descriere: {module.descriere}</p>
                        <div className="resources">
                            <h4>Videoclipuri</h4>
                            {module.videos && module.videos.length > 0 ? (
                                module.videos.map(video => (
                                    <VideoPlayer 
                                        key={video.idVideo} 
                                        url={buildVideoUrl(video.url)} 
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
                                        url={buildPdfUrl(pdf.url)} 
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

export default CourseDetails;
