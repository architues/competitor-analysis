import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const CompetitorStep = ({ onComplete, onSkip }) => {
    const [formData, setFormData] = useState({ name: '', website: '' });
    const [competitors, setCompetitors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch existing competitors on mount
    useEffect(() => {
        fetchCompetitors();
    }, []);

    const fetchCompetitors = async () => {
        try {
            const data = await apiCall('/competitors', 'GET');
            setCompetitors(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch competitors:', err);
            // Don't show error for initial fetch - user might have none
            setCompetitors([]);
        }
    };

    const handleAddCompetitor = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError('Competitor name is required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // POST to create competitor
            await apiCall('/competitors', 'POST', {
                name: formData.name,
                website: formData.website || undefined
            });

            // Refetch to get updated list from backend
            await fetchCompetitors();

            // Clear form
            setFormData({ name: '', website: '' });
        } catch (err) {
            setError(err.message || 'Failed to add competitor');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('okayreport_onboarding_complete', 'true');
        onSkip();
    };

    const handleContinue = () => {
        localStorage.setItem('okayreport_onboarding_complete', 'true');
        onComplete();
    };

    return (
        <div className="onboarding-step">
            <div className="step-header">
                <h1>Add Your Competitors</h1>
                <p>Start tracking your competition</p>
            </div>

            <div className="step-content">
                <form onSubmit={handleAddCompetitor} className="competitor-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Competitor Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Acme Corp"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Website (Optional)</label>
                        <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://example.com"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-secondary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Competitor'}
                    </button>
                </form>

                {competitors.length > 0 && (
                    <div className="competitors-list">
                        <h3>Added Competitors ({competitors.length})</h3>
                        <div className="competitor-cards">
                            {competitors.map((comp) => (
                                <div key={comp.id} className="competitor-card">
                                    <div className="competitor-name">{comp.name}</div>
                                    {comp.website && (
                                        <div className="competitor-website">{comp.website}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="step-actions">
                <button className="btn-link" onClick={handleSkip}>
                    Skip Onboarding
                </button>
                <button
                    className="btn-primary"
                    onClick={handleContinue}
                    disabled={competitors.length === 0}
                >
                    Continue to Dashboard
                </button>
            </div>
        </div>
    );
};

export default CompetitorStep;
