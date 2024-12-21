import React, { useState } from 'react';
import ModuleCard from './ModuleCard';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleModules = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="course-card">
      <div className="course-header" onClick={toggleModules}>
        <h2>{course.titlu}</h2>
        <button>{isExpanded ? 'Ascunde Modulele' : 'Afișează Modulele'}</button>
      </div>
      <p>{course.descriere}</p>
      <p><strong>Durată:</strong> {course.durata} ore</p>
      <p><strong>Dificultate:</strong> {course.nivelDificultate}</p>
      <p><strong>Instructor:</strong> {course.instructor.nume}</p>
      
      {isExpanded && (
        <div className="modules-section">
          <h3>Module</h3>
          {course.modules && course.modules.length > 0 ? (
            course.modules.map((module) => (
              <ModuleCard key={module.idModule} module={module} />
            ))
          ) : (
            <p>Nu există module pentru acest curs.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCard;
