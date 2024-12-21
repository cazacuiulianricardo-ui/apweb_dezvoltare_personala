import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Module from './Module'; 
import AddModuleForm from './AddModuleForm'; 
import './ModuleManagement.css'; 

const ModuleManagement = () => {
    const { auth } = useContext(AuthContext);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModule, setShowAddModule] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log('Auth state:', auth); 
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/cursuri/mele-create');
                setCourses(response.data);
                if (response.data.length > 0) {
                    setSelectedCourseId(response.data[0].idCurs);
                }
            } catch (error) {
                console.error('Eroare la obținerea cursurilor create:', error);
                toast.error('Nu s-au putut încărca cursurile create.');
            }
        };

        fetchCourses();
    }, [auth.token]);

    useEffect(() => {
        const fetchModules = async () => {
            if (!selectedCourseId) return;
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/modules/cursuri/${selectedCourseId}/modules`);
                setModules(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Eroare la obținerea modulelor:', error);
                toast.error('Nu s-au putut încărca modulele.');
                setLoading(false);
            }
        };

        fetchModules();
    }, [selectedCourseId, auth.token]);

    const addModule = (newModule) => {
        setModules([...modules, newModule]);
    };

    const updateModule = (updatedModule) => {
        setModules(modules.map(module => module.idModule === updatedModule.idModule ? updatedModule : module));
    };

    const deleteModule = (moduleId) => {
        setModules(modules.filter(module => module.idModule !== moduleId));
    };

    return (
        <div className="module-management">
            <h1>Gestionare Module</h1>

            {/* ... */}
            <div className="course-selector">
                <label htmlFor="courseSelect">Selectează Cursul:</label>
                <select
                    id="courseSelect"
                    value={selectedCourseId || ''}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                    {courses.map(course => (
                        <option key={course.idCurs} value={course.idCurs}>
                            {course.titlu}
                        </option>
                    ))}
                </select>
            </div>

            {/* ... */}
            <button onClick={() => setShowAddModule(true)} className="add-module-btn">
                Adaugă Modul
            </button>

            {/* ..*/}
            {showAddModule && (
                <AddModuleForm
                    courseId={selectedCourseId}
                    onClose={() => setShowAddModule(false)}
                    onAdd={addModule}
                />
            )}

            {/* .. */}
            {loading ? (
                <div>Se încarcă modulele...</div>
            ) : (
                <div className="modules-list">
                    {modules.length > 0 ? (
                        modules.map(module => (
                            <Module
                                key={module.idModule}
                                module={module}
                                onUpdate={updateModule}
                                onDelete={deleteModule}
                            />
                        ))
                    ) : (
                        <p>Nu ai module pentru acest curs.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ModuleManagement;
