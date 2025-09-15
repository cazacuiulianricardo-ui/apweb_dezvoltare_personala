import React from 'react';
import './PDFViewer.css';

const PDFViewer = ({ url, title }) => {
    return (
        <div className="pdf-viewer">
            <h4>{title}</h4>
            {url ? (
                <iframe
                    src={url}
                    title={title}
                    width="100%"
                    height="500px"
                    style={{ border: 'none' }}
                >
                    <p>PDF-ul nu poate fi afișat.</p>
                </iframe>
            ) : (
                <p>Fișierul PDF nu este disponibil.</p>
            )}
        </div>
    );
};

export default PDFViewer;