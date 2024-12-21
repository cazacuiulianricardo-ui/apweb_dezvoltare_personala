import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const RoleBasedRoute = ({ children, role }) => {
    const { auth } = useContext(AuthContext);

    if (!auth.isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (auth.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RoleBasedRoute;
