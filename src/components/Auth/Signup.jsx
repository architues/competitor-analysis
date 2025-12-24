import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../../utils/api';
import '../../styles/Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await apiCall('/auth/signup', 'POST', { name, email, password });

            // Guard: Check for required data
            if (!data.token) {
                throw new Error('No authentication token received');
            }

            if (!data.defaultWorkspace?.id) {
                throw new Error('No workspace assigned. Please contact support.');
            }

            // Save token
            localStorage.setItem('okayreport_token', data.token);

            // Save workspace ID (only the ID, as a string)
            localStorage.setItem('okayreport_ws', String(data.defaultWorkspace.id));

            // Fetch available workspaces
            try {
                const workspaces = await apiCall('/workspaces', 'GET');
                if (Array.isArray(workspaces)) {
                    localStorage.setItem('okayreport_workspaces', JSON.stringify(workspaces));
                }
            } catch (wsErr) {
                console.error('Failed to fetch workspaces:', wsErr);
                // Don't block signup if workspace fetch fails
            }

            console.log('Signup Success:', data);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">⚡</div>
                    <h1>Get Started</h1>
                    <p>Create your new account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="name@company.com"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? 'Create Account' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
