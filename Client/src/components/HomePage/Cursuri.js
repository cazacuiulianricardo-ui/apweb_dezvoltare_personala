import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cursuri = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/cursuri');
                setCourses(response.data);
            } catch (error) {
                console.error('Eroare la obținerea cursurilor:', error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Cursuri Disponibile</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <h3>{course.titlu}</h3>
                        <p>{course.descriere}</p>
                        <p>Instructor: {course.instructor.nume}</p>
                        <p>Durată: {course.durata} minute</p>
                        <p>Dificultate: {course.nivelDificultate}</p>
                        <Link to={`/cursuri/${course.id}`}>Detalii curs</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cursuri;
