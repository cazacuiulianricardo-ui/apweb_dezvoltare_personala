import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/signin');
    };

    return (
        <div>
            <header>
                <nav>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none', padding: 0, margin: 0, backgroundColor: '#f1f1f1' }}>
                        <li style={{ padding: '10px 20px' }}><Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link></li>
                        <li style={{ padding: '10px 20px' }}><Link to="/cursuri" style={{ textDecoration: 'none', color: '#333' }}>Cursuri</Link></li>
                        
                        {!auth.isAuthenticated && (
                            <>
                                <li style={{ padding: '10px 20px' }}><Link to="/signin" style={{ textDecoration: 'none', color: '#333' }}>Login</Link></li>
                                <li style={{ padding: '10px 20px' }}><Link to="/signup" style={{ textDecoration: 'none', color: '#333' }}>Sign up</Link></li>
                            </>
                        )}

                        {auth.isAuthenticated && auth.role === 'client' && (
                            <>
                                <li style={{ padding: '10px 20px' }}><Link to="/abonamente2" style={{ textDecoration: 'none', color: '#333' }}>Abonament</Link></li>
                                <li style={{ padding: '10px 20px' }}><Link to="/cursurile-mele" style={{ textDecoration: 'none', color: '#333' }}>Cursurile Mele</Link></li>
                            </>
                        )}

                        {auth.isAuthenticated && auth.role === 'instructor' && (
                            <>
                                <li style={{ padding: '10px 20px' }}><Link to="/instructor/cursurile-mele-create" style={{ textDecoration: 'none', color: '#333' }}>Cursurile Mele Create</Link></li>
                                <li style={{ padding: '10px 20px' }}><Link to="/instructor/adauga-curs-nou" style={{ textDecoration: 'none', color: '#333' }}>Adaugă Curs Nou</Link></li>
                            </>
                        )}

                        {auth.isAuthenticated && (
                            <li style={{ padding: '10px 20px' }}>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
