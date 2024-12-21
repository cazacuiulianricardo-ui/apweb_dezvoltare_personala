import React, { useState } from 'react';
import Resource from './Resource';
import './ModuleCard.css';

const ModuleCard = ({ module }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleResources = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="module-card">
      <div className="module-header" onClick={toggleResources}>
        <h4>{module.nume}</h4>
        <button>{isExpanded ? 'Ascunde Resursele' : 'Afișează Resursele'}</button>
      </div>
      <p>{module.descriere}</p>
      
      {isExpanded && (
        <div className="resources-section">
          <h5>Videoclipuri</h5>
          {module.videos && module.videos.length > 0 ? (
            module.videos.map((video) => (
              <Resource key={video.idVideo} resource={video} type="video" />
            ))
          ) : (
            <p>Nu există videoclipuri pentru acest modul.</p>
          )}

          <h5>Fișiere PDF</h5>
          {module.pdfs && module.pdfs.length > 0 ? (
            module.pdfs.map((pdf) => (
              <Resource key={pdf.idPDF} resource={pdf} type="pdf" />
            ))
          ) : (
            <p>Nu există fișiere PDF pentru acest modul.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
