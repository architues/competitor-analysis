import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('okayreport_token');
    const location = useLocation();

    if (!token) {
        // Redirect to login, but could replace with more complex logic (e.g. check expiry)
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
