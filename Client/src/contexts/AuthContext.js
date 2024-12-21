import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        role: null,
        token: null, 
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                   
                    localStorage.removeItem('jwt_token');
                    setAuth({
                        isAuthenticated: false,
                        user: null,
                        role: null,
                        token: null,
                    });
                } else {
                    setAuth({
                        isAuthenticated: true,
                        user: { id: decoded.id, email: decoded.email },
                        role: decoded.tipUtilizator, 
                        token: token, 
                    });
                }
            } catch (error) {
                console.error('Eroare la decodificarea token-ului:', error);
                localStorage.removeItem('jwt_token');
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    role: null,
                    token: null,
                });
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('jwt_token', token);
        const decoded = jwtDecode(token); 
        setAuth({
            isAuthenticated: true,
            user: { id: decoded.id, email: decoded.email },
            role: decoded.tipUtilizator,
            token: token, 
        });
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setAuth({
            isAuthenticated: false,
            user: null,
            role: null,
            token: null,
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
