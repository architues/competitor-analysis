import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { Save, Camera } from 'lucide-react';

const ProfileSettings = () => {
    const { currentUser } = useCollaboration();
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: 'demo@example.com', // Mock email
        role: 'Product Manager' // Mock job title
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            // In a real app we would update the user context here
        }, 1000);
    };

    return (
        <div className="profile-settings">
            <form onSubmit={handleSubmit}>
                <div className="settings-section">
                    <div className="section-header">
                        <h3 className="section-title">Public Profile</h3>
                        <p className="section-desc">This information will be visible to your team.</p>
                    </div>

                    <div className="avatar-section">
                        <div className="avatar-preview" style={{ background: currentUser.color || '#3b82f6' }}>
                            {currentUser.avatar}
                        </div>
                        <div className="avatar-actions">
                            <button type="button" className="btn-secondary">
                                <Camera size={16} style={{ marginBottom: -3 }} /> Change Photo
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Display Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <div className="section-header">
                        <h3 className="section-title">Contact Information</h3>
                        <p className="section-desc">Manage your email and communication preferences.</p>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={saving}>
                        <Save size={18} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
