import React, { useState } from 'react';

const WelcomeStep = ({ onContinue }) => {
    const [selectedRole, setSelectedRole] = useState('');

    const roles = [
        { value: 'product', label: 'Product Manager' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'founder', label: 'Founder' },
        { value: 'analyst', label: 'Analyst' },
        { value: 'other', label: 'Other' }
    ];

    const handleContinue = () => {
        if (selectedRole) {
            localStorage.setItem('okayreport_role', selectedRole);
        }
        onContinue();
    };

    return (
        <div className="onboarding-step">
            <div className="step-header">
                <h1>Welcome to OkayReport</h1>
                <p>Let's get you set up in just a few steps</p>
            </div>

            <div className="step-content">
                <div className="form-group">
                    <label>What's your role? (Optional)</label>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="">Select your role...</option>
                        {roles.map(role => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="step-actions">
                <button className="btn-primary" onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default WelcomeStep;
