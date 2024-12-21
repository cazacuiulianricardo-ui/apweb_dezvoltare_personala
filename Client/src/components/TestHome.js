import React from 'react';
import { Link } from 'react-router-dom';

const TestHome = () => {
    return (
        <div className="container">
            <h2>Bun venit!</h2>
            <p>Selectează un modul pentru a începe:</p>
            <div>
                <Link to="/utilizatori" className="button">Gestionează Utilizatori</Link>
                <Link to="/cursuri" className="button">Gestionează Cursuri</Link>
            </div>
        </div>
    );
};

export default TestHome;
