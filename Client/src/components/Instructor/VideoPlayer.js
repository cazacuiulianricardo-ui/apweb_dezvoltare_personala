import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ url, title }) => {
    return (
        <div className="video-player">
            <h4>{title}</h4>
            {url ? (
                <video controls width="100%">
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>Fișierul video nu este disponibil.</p>
            )}
        </div>
    );
};

export default VideoPlayer;
