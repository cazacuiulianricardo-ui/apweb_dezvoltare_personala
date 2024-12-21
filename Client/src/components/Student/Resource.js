import React from 'react';
import './Resource.css';

const Resource = ({ resource, type }) => {
  const backendBaseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:7500';

  const resourceUrl = type === 'video'
    ? `${backendBaseURL}/uploads/videos/${resource.url}`
    : `${backendBaseURL}/uploads/pdfs/${resource.url}`;

  return (
    <div className="resource">
      <h6>{resource.titlu}</h6>
      {type === 'video' ? (
        <video controls width="100%">
          <source src={resourceUrl} type="video/mp4" />
          Browserul tău nu suportă tag-ul video.
        </video>
      ) : (
        <iframe
          src={resourceUrl}
          title={resource.titlu}
          width="100%"
          height="500px"
          style={{ border: 'none' }}
        >
          <p>PDF-ul nu poate fi afișat.</p>
        </iframe>
      )}
    </div>
  );
};

export default Resource;
