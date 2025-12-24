import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('okayreport_token');
    const location = useLocation();

    // First check: Authentication
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Second check: Onboarding (only for authenticated users)
    const isOnboardingComplete = localStorage.getItem('okayreport_onboarding_complete') === 'true';

    if (!isOnboardingComplete && location.pathname !== '/onboarding') {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
};

export default ProtectedRoute;
