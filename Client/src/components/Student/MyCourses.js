import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import CourseCard from './CourseCard';
import './MyCourses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await axiosInstance.get('/cursuri/mele'); 
        setCourses(response.data);
        setError('');
      } catch (err) {
        console.error('Eroare la obținerea cursurilor:', err);
        setError(err.response?.data?.message || 'Eroare la încărcarea cursurilor.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return <div>Se încarcă cursurile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-courses">
      <h1>Cursurile Mele</h1>
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <p>Nu ai cursuri disponibile în acest moment.</p>
      )}
    </div>
  );
};

export default MyCourses;
